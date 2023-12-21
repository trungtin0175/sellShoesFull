const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connect = require('./config/index');
const dotenv = require('dotenv');
const multer = require('multer');
const moment = require('moment');
const cloudinary = require('cloudinary');
const multerStorageCloundinary = require('multer-storage-cloudinary');
// import dateFormat from 'dateformat';
//const routerUser= require('./API/router/user.router')
const siteRouter = require('./API/router/site.router');
const userRouter = require('./API/router/user.router');
const productRouter = require('./API/router/product.router');
const categoryRouter = require('./API/router/category.router');
const orderRouter = require('./API/router/order.router');
const cartRouter = require('./API/router/cart.router');
const commentRouter = require('./API/router/comment.router');
const alertRouter = require('./API/router/alert.router');
const blogRouter = require('./API/router/blog.router');
const saleRouter = require('./API/router/sale.router');
const favoriteRouter = require('./API/router/favorite.router');
const chatRouter = require('./API/router/chat.router');
const messageRouter = require('./API/router/message.router');
const statisticalRouter = require('./API/router/statistical.router');
const router = require('./API/router/vnp.router');

const AccountModel = require('./models/user.model');
const ProductModel = require('./models/product.model');
const CategoryModel = require('./models/category.model');
const OrderModel = require('./models/order.model');
const DetailOrderModel = require('./models/detail-order.model');
const NoteModel = require('./models/note.model');
const PaymentModel = require('./models/payment.model');
const CartModel = require('./models/cart.model');
const CommentModel = require('./models/comment.model');
const AlertModel = require('./models/alert.model');
const BlogModel = require('./models/blog.model');
const SaleModel = require('./models/sale.model');
const CouponModel = require('./models/coupon.model');
const FavoriteModel = require('./models/favorite.model');
const ChatModel = require('./models/chat.model');
const DetailChatRoomModel = require('./models/detailChat.model');

const corOption = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};

app.use(cors(corOption));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
connect();

app.use(siteRouter);
app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(cartRouter);
app.use(commentRouter);
app.use(alertRouter);
app.use(blogRouter);
app.use(saleRouter);
app.use(favoriteRouter);
app.use(chatRouter);
app.use(messageRouter);
app.use(statisticalRouter);
app.use(router);
//app.use('/api/account/', AccountRouter)
app.listen(3000, () => {
    console.log(`Server started on port`);
});
