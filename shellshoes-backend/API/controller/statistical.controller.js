const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const OrderModel = require('../../models/order.model');
const UserModel = require('../../models/user.model');
const ProductModel = require('../../models/product.model');
const SaleModel = require('../../models/sale.model');
const DetailOrder = require('../../models/detail-order.model');
const statisticalController = {
    monthlyRevenue: async (req, res, next) => {
        try {
            const { year } = req.query;
            const startOfMonth = moment(`${year}-01-01`).toISOString();
            const endOfMonth = moment(`${year}-12-31`).toISOString();

            const findRevenue = await OrderModel.find({
                dateOrder: { $gte: startOfMonth, $lte: endOfMonth },
            });
            let revenueByMonth = {};
            findRevenue.forEach((total) => {
                const { totalPrice, dateOrder } = total;
                const yearMonth = moment(dateOrder).format('MM');
                revenueByMonth[yearMonth] = (revenueByMonth[yearMonth] || 0) + totalPrice;
            });
            return res.status(200).json({
                sucess: true,
                data: revenueByMonth,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    requestRevenue: async (req, res, next) => {
        try {
            const findRevenue = await OrderModel.find();
            const startRequest = moment(req.body.startRequest, 'DD-MM-YYYY').startOf('day');
            const endRequest = moment(req.body.endRequest, 'DD-MM-YYYY').endOf('day');

            const dailyRevenue = {};

            findRevenue.forEach((order) => {
                const dateOrder = moment(order.dateOrder).format('YYYY-MM-DD');
                const check = moment(order.dateOrder).isBetween(startRequest, endRequest);
                //console.log(check);
                if (check) {
                    dailyRevenue[dateOrder] = (dailyRevenue[dateOrder] || 0) + order.totalPrice;
                }
            });
            return res.status(200).json({
                sucess: true,
                data: dailyRevenue,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    totalRevenue: async (req, res, next) => {
        try {
            const findOrder = await OrderModel.find();
            const result = findOrder.reduce((total, item) => total + item.totalPrice, 0);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    orderNumber: async (req, res, next) => {
        try {
            const findOrder = await OrderModel.find();
            const orderNumber = findOrder.length;
            return res.status(200).json(orderNumber);
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    userNumber: async (req, res, next) => {
        try {
            const findUser = await UserModel.find();
            const userNumber = findUser.length;
            return res.status(200).json(userNumber);
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    monthlyUser: async (req, res, next) => {
        try {
            const { year } = req.query;
            const startOfMonth = moment(`${year}-01-01`).toISOString();
            const endOfMonth = moment(`${year}-12-31`).toISOString();
            const findUser = await UserModel.find({
                createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            });
            const userByMonth = {};
            findUser.forEach((total) => {
                if (total.isAdmin === false) {
                    const { createdAt } = total;
                    const userMonth = moment(createdAt).format('MM');
                    userByMonth[userMonth] = (userByMonth[userMonth] || 0) + 1;
                }
            });
            return res.status(200).json({
                sucess: true,
                data: userByMonth,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    sellNumber: async (req, res, next) => {
        try {
            const findSell = await OrderModel.find().populate({
                path: 'orderProducts',
            });
            let totalQuantity = 0;
            findSell.forEach((orders) => {
                orders.orderProducts.forEach((order) => {
                    totalQuantity += order.quantity;
                });
                return totalQuantity;
            });
            // const totalQuantity = findSell.reduce((total, order) => {
            //     const orderQuantity = order.orderProducts.reduce(
            //         (subtotal, product) => subtotal + product.quantity,
            //         0,
            //     );
            //     return total + orderQuantity;
            // }, 0);
            return res.status(200).json({
                sucess: true,
                data: totalQuantity,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    topTenHighestRevenueProducts: async (req, res, next) => {
        try {
            const findOrderProduct = await OrderModel.find()
                .populate({
                    path: 'orderProducts',
                    select: 'id_product price',
                    populate: {
                        path: 'id_product',
                        select: 'name_product',
                    },
                })
                .select('orderProducts')
                .exec();
            const sumPricePorduct = findOrderProduct.reduce((result, order) => {
                order.orderProducts.forEach((product) => {
                    const { _id, name_product } = product.id_product;
                    const existingProduct = result.find((item) => item.id_product._id === _id);
                    if (!existingProduct) {
                        result.push({
                            id_product: _id,
                            name_product: name_product,
                            sumPrice: product.price,
                        });
                    } else {
                        existingProduct.sumPrice += product.price;
                    }
                });

                return result;
            }, []);
            return res.status(200).json({
                sucess: true,
                data: sumPricePorduct,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    inventory: async (req, res, next) => {
        try {
            const findInventory = await ProductModel.find();
            return res.status(200).json({
                sucess: true,
                data: findInventory,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    productSale: async (req, res, next) => {
        try {
            const productSale = await SaleModel.find().populate({
                path: 'saleProducts.id_product',
            });

            const exchange = productSale.map((product) => {
                const startSale = moment(product.startSale)
                    .tz('Asia/Bangkok')
                    .format('DD-MM-YYYY HH:mm');
                //console.log('startSale', startSale);
                const endSale = moment(product.endSale)
                    .tz('Asia/Bangkok')
                    .format('DD-MM-YYYY HH:mm');
                return {
                    ...product._doc,
                    startSale: startSale,
                    endSale: endSale,
                };
            });
            return res.status(200).json({
                sucess: true,
                data: exchange,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
};
module.exports = statisticalController;
