const moment = require('moment');
const OrderModel = require('../../models/order.model');
const AlertModel = require('../../models/alert.model');
const DetailOrderModel = require('../../models/detail-order.model');

const alertController = {
    // api/order/alert/confirmed
    alertConfirm: async (req, res, next) => {
        try {
            const id_user = req.body.id_user;
            const id_order = req.body.id_order;
            const title = 'Xác nhận đơn hàng';
            const message = `Đơn hàng ${id_order} của bạn đã được xác nhận!`;
            const formattedTimestamp = moment().format('DD/MM/YYYY HH:mm');
            const order = await OrderModel.findOne({ id_user, id_order });
            const alert = new AlertModel({
                title: title,
                message: message,
                id_user: id_user,
                id_order: id_order,
            });
            await alert.save();
            return res.status(200).json({
                sucess: true,
                data: {
                    ...alert._doc,
                    createAt: formattedTimestamp,
                },
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    // api/order/alert/shipped
    alertShipped: async (req, res, next) => {
        try {
            const id_user = req.body.id_user;
            const id_order = req.body.id_order;
            const title = 'Đơn hàng đang giao';
            const message = `Đơn hàng ${id_order} đang trên đường giao đến bạn!`;
            const formattedTimestamp = moment().format('DD/MM/YYYY HH:mm');
            const order = await OrderModel.findOne({ id_user, id_order });
            const alert = new AlertModel({
                title: title,
                message: message,
                id_user: id_user,
                id_order: id_order,
            });
            await alert.save();
            return res.status(200).json({
                sucess: true,
                data: {
                    ...alert._doc,
                    createAt: formattedTimestamp,
                },
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    // api/order/alert/delivered
    alertDelivered: async (req, res, next) => {
        try {
            const id_user = req.body.id_user;
            const id_order = req.body.id_order;
            const title = 'Đơn hàng đã được giao';
            const message = `Đơn hàng ${id_order} đã được giao thành công`;
            const formattedTimestamp = moment().format('DD/MM/YYYY HH:mm');
            const order = await OrderModel.findOne({ id_user, id_order });
            const alert = new AlertModel({
                title: title,
                message: message,
                id_user: id_user,
                id_order: id_order,
            });
            await alert.save();
            return res.status(200).json({
                sucess: true,
                data: {
                    ...alert._doc,
                    createAt: formattedTimestamp,
                },
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    // api/alert/all
    alertAll: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            //console.log(userId);
            const findAlert = await AlertModel.find({ id_user: userId });
            //console.log(findAlert);
            const formattedAllAlert = findAlert.map((allAlert) => {
                return {
                    ...allAlert._doc,
                    createAt: moment(allAlert.createAt).format('DD/MM/YYYY HH:mm'),
                };
            });
            return res.status(200).json({
                sucess: true,
                data: formattedAllAlert,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    // api/alert/read/:_id
    readAlert: async (req, res, next) => {
        try {
            const idAlert = { _id: req.params._id };
            const isRead = {
                read: true,
            };
            const findAlert = await AlertModel.findOneAndUpdate(idAlert, isRead, {
                new: true,
            });
            return res.status(200).json({
                sucess: true,
                data: findAlert,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    alertWaiting: async (req, res, next) => {
        try {
            const { id_user, id_order } = req.body;
            const order = await OrderModel.findOne({ _id: id_order, id_user: id_user });
            if (!order) {
                return res.status(404).json({
                    sucess: false,
                    message: 'The order not found!',
                });
            }
            const title = 'Đang chờ lấy hàng';
            const message = `Đơn hàng ${id_order} của bạn đang chờ lấy hàng`;
            const formattedTimestamp = moment().format('DD/MM/YYYY HH:mm');
            const alert = new AlertModel({
                title: title,
                message: message,
                id_user: id_user,
                id_order: id_order,
            });
            await alert.save();
            return res.status(200).json({
                sucess: true,
                data: {
                    ...alert._doc,
                    createAt: formattedTimestamp,
                },
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
};

module.exports = alertController;
