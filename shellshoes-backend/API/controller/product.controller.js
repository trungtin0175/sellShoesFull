const ProductModel = require('../../models/product.model');
const SaleModel = require('../../models/sale.model');
const CategoryModel = require('../../models/category.model');
const cloudinary = require('cloudinary').v2;
const { checkSaleProduct } = require('./sale.controller');
const { getCurrentSaleProduct } = require('./sale.controller');
const momentTimeZone = require('moment-timezone');
const moment = require('moment');
const productController = {
    // api/filterproduct
    filterProduct: async (req, res) => {
        try {
            const id_category = req.query._id;
            const productList = await ProductModel.find({ id_category: id_category })
                .populate('id_category')
                .exec();
            if (!id_category) {
                return res.status(404).json({
                    sucess: false,
                    message: 'The category not found!',
                });
            }
            let productArray = [];
            for (const product of productList) {
                const checkProduct = await getCurrentSaleProduct(product._id);
                const result = {
                    product: product,
                    productInSale: checkProduct,
                };
                productArray.push(result);
            }
            if (!productArray || productArray.length === 0) {
                res.status(404).json({
                    sucess: false,
                    message: 'No products found in this category',
                });
            }
            return res.status(200).json({
                sucess: true,
                data: productArray,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    //[GET] api/allproduct
    allProduct: async (req, res, next) => {
        try {
            const products = await ProductModel.find().populate({
                path: 'id_category',
            });
            const currentDate = moment();
            const checkProductSaleInTime = await SaleModel.find();
            const currentSales = checkProductSaleInTime.filter((product) => {
                const startSale = moment(product.startSale).tz('Asia/Bangkok');
                const endSale = moment(product.endSale).tz('Asia/Bangkok');
                return currentDate.isBetween(startSale, endSale);
            });

            const productsWithSaleInfo = JSON.parse(JSON.stringify(products));

            productsWithSaleInfo.forEach((product) => {
                const saleInfo = currentSales.find((sale) => {
                    const saleProduct = sale.saleProducts.find(
                        (sp) => sp.id_product.toString() === product._id.toString(),
                    );
                    return saleProduct !== undefined;
                });

                if (saleInfo) {
                    const saleProduct = saleInfo.saleProducts.find(
                        (sp) => sp.id_product.toString() === product._id.toString(),
                    );
                    product.salePrice = saleProduct.salePrice;
                }
            });
            const reversedProducts = productsWithSaleInfo.reverse();
            res.json(reversedProducts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // api/product/detail/:_id
    productDetail: async (req, res) => {
        try {
            const productDetail = await ProductModel.findById(req.params._id);
            if (!productDetail) {
                res.status(404).json({
                    sucess: false,
                    message: 'The product not found!',
                });
            }
            return res.status(200).json({
                sucess: true,
                data: productDetail,
            });
        } catch (error) {
            res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    //[POST] /api/newproduct
    createNewproduct: async (req, res, next) => {
        try {
            console.log(req.body);
            const id_category = await CategoryModel.findOne({ category: req.body.category });
            const sizesArray = req.body.sizes.map((size) => JSON.parse(size));
            console.log(sizesArray);
            const newProduct = await new ProductModel({
                name_product: req.body.name_product,
                price_product: req.body.price_product,
                image: req.files.map((file) => file.path),
                sizes: sizesArray,
                describe: req.body.describe,
                detail: req.body.detail,
                id_category: id_category._id,
            });
            const product = await newProduct.save();

            return res.status(200).send(newProduct);
        } catch (error) {
            if (req.files) {
                for (const item of req.files) {
                    await cloudinary.uploader.destroy(item.filename);
                }
            }
            return res.status(500).json({ error: error.message });
        }
    },
    //[PUT] /api/product/edit/:_id
    // updateProduct: async (req, res, next) => {
    //     try {
    //         console.log(req.body.sizes);
    //         // const size = req.body.sizes;
    //         //const sizesArray = size.map((size) => JSON.parse(size));
    //         const sizeArray = JSON.parse(req.body.sizes);
    //         const newSizeProduct = sizeArray.map((size) => ({
    //             size: size.size,
    //             quantity: size.quantity,
    //         }));
    //         //console.log('sizes change', sizesArray);

    //         //console.log(sizes);
    //         const updatedProductData = {
    //             name_product: req.body.name_product,
    //             //oldPrice_product: req.body.oldPrice_product,
    //             price_product: req.body.price_product,
    //             sizes: newSizeProduct,
    //             //size: req.body.size,
    //             //image: req.file.path,
    //             //quantity: req.body.quantity,
    //             describe: req.body.describe,
    //             detail: req.body.detail,
    //             category: req.body.category,
    //         };
    //         // image: req.files.map((file) => file.path),

    //         if (req.files) {
    //             updatedProductData.image = req.files.path;
    //         }
    //         //updatedProductData.sizes = newSizeProduct;
    //         const conditionalProductData = {
    //             _id: req.params._id,
    //         };
    //         const updatedProduct = await ProductModel.findOneAndUpdate(
    //             conditionalProductData,
    //             updatedProductData,
    //             {
    //                 new: true,
    //             },
    //         );
    //         return res.status(200).json({
    //             message: 'Updated product sucessfully',
    //             data: updatedProduct,
    //         });
    //     } catch (error) {
    //         if (req.files) {
    //             for (const item of req.files) {
    //                 await cloudinary.uploader.destroy(item.filename);
    //             }
    //         }
    //         return res.status(500).json({ error: error.message });
    //     }
    // },
    updateProduct: async (req, res, next) => {
        try {
            console.log(req.body);
            const { name_product, price_product, sizes, describe, detail, category } = req.body;
            const sizesArray = sizes.map((size) => JSON.parse(size));
            const updatedProductData = {
                name_product: name_product,
                price_product: price_product,
                sizes: sizesArray,
                describe: describe,
                detail: detail,
                category: category,
            };

            if (req.files.length > 0) {
                const image = req.files.map((item) => {
                    return item.path;
                });
                updatedProductData.image = image;
            }

            const result = await ProductModel.findOneAndUpdate(
                {
                    _id: req.params._id,
                },
                updatedProductData,
                { new: true },
            );

            res.status(200).json({
                message: 'Updated successfully',
                data: result,
            });
        } catch (error) {
            if (req.files) {
                for (const item of req.files) {
                    await cloudinary.uploader.destroy(item.filename);
                }
            }
            return res.status(500).json({ error: error.message, stack: error.stack });
        }
    },
    //[DELETE] /api/product/delete/:_id
    deleteProduct: async (req, res, next) => {
        try {
            const deleteProduct = await ProductModel.findByIdAndRemove(req.params._id);
            if (deleteProduct) {
                return res.status(200).json({
                    sucess: true,
                    message: 'The product is deleted!',
                });
            } else {
                return res.status(404).json({
                    sucess: false,
                    message: 'The product not found!',
                });
            }
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    // api/search
    searchProduct: async (req, res, next) => {
        try {
            const search = req.query.search;
            const product_data = await ProductModel.find({
                name_product: { $regex: '.*' + search + '.*', $options: 'i' },
            });
            if (product_data.length > 0) {
                let productArray = [];
                for (const product of product_data) {
                    const checkProduct = await getCurrentSaleProduct(product._id);
                    const result = {
                        product: product,
                        productInSale: checkProduct,
                    };
                    productArray.push(result);
                }
                return res.status(200).json({
                    sucess: true,
                    data: productArray,
                });
            } else {
                return res.status(200).json({
                    sucess: true,
                    msg: 'Products not found!',
                });
            }
        } catch (error) {
            res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    checkStock: async (productId, size, quantity, orderProduct) => {
        const findProduct = await ProductModel.findOne({ _id: productId });
        if (!findProduct) {
            return {
                sucess: false,
                status: 404,
                message: `The product with ID ${productId} not found!`,
            };
        }

        const sizeObject = findProduct.sizes.find((s) => s.size === size);

        if (!sizeObject) {
            return {
                sucess: false,
                status: 400,
                message: `Size ${size} not available for product with ID ${productId}`,
            };
        }

        const availableQuantity = sizeObject.quantity;

        if (quantity > availableQuantity) {
            return {
                sucess: false,
                status: 400,
                message: `Not enough stock for product with ID ${productId} and size ${size}`,
            };
        }

        return {
            sucess: true,
            status: 200,
            message: `Stock is available for product with ID ${productId} size ${size}`,
            data: orderProduct,
        };
    },
    productHomePage: async (req, res, next) => {
        try {
            let perPage = 2;
            let page = req.params.page || 1;
            const products = await ProductModel.find()
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();
            const count = await ProductModel.countDocuments();
            return res.status(200).json({
                sucess: true,
                data: { products, current: page, pages: Math.ceil(count / perPage) },
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    productPagination: async (req, res, next) => {
        try {
            let perPage = 2;
            let page = req.params.page;
            const products = await ProductModel.find()
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();
            const count = await ProductModel.countDocuments();
            res.status(200).json({
                sucess: true,
                data: { products, current: page },
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    detailProduct: async (req, res, next) => {
        try {
            const idProduct = req.params._id;
            const findProduct = await ProductModel.findById(idProduct);
            if (!findProduct) {
                return res.status(404).json({
                    sucess: false,
                    message: 'The Product not found!',
                });
            }
            const checkProductIsInSale = await getCurrentSaleProduct(idProduct);
            const result = {
                product: findProduct,
                productIsInSale: checkProductIsInSale,
            };
            return res.status(200).json({
                sucess: true,
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
};

//console.log('checkstock', productController.checkStock('65119c48fc7f41f92911db94', '11', 10));

module.exports = productController;
