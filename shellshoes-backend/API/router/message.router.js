const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controller/message.controller');
const uploadMiddleware = require('../../middleware/upload.mid');

messageRouter.post(
    '/api/send/message',
    uploadMiddleware.single('image'),
    messageController.sendMessage,
);
messageRouter.get('/api/message/:_id', messageController.getRoomMessage);

module.exports = messageRouter;
