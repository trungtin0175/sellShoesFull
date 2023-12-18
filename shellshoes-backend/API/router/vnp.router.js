const express = require('express');
const vnpayRouter = express.Router();
const vnpayController = require('../controller/vnp.controller');

vnpayRouter.post('/api/create_payment_url', vnpayController.createPaymentUrl);
vnpayRouter.get('/api/vnpay_ipn', vnpayController.vnpayIpn);
vnpayRouter.get('/api/vnpay_return', vnpayController.vpnReturn);
module.exports = vnpayRouter;
