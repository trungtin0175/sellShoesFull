const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controller/chat.controller');

chatRouter.post('/api/create/chat', chatController.createChat);
chatRouter.get('/api/search/user', chatController.findUserChat);
chatRouter.get('/api/all/chat', chatController.allChat);

module.exports = chatRouter;
