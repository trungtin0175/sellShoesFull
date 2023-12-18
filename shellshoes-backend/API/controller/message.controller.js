const DetailChatRoomModel = require('../../models/detailChat.model');
const uploadMiddleware = require('../../middleware/upload.mid');
const cloudinary = require('cloudinary').v2;
const messageController = {
    sendMessage: async (req, res, next) => {
        try {
            const { roomId, senderId, content } = req.body;
            //console.log(req.body);
            const chat = await DetailChatRoomModel.findOne({ roomId: roomId });
            if (!chat) {
                return res.status(404).json({
                    sucess: false,
                    message: 'The room chat not found!',
                });
            }
            const newMessage = {
                senderId,
                content,
            };
            if (req.file) {
                newMessage.image = req.file.path;
            }
            const detailChat = await DetailChatRoomModel.findOneAndUpdate(
                { roomId },
                { $push: { messages: newMessage } },
                { new: true },
            );
            return res.status(200).json({
                sucess: true,
                data: detailChat,
            });
        } catch (error) {
            if (req.file) {
                cloudinary.uploader.destroy(req.file.filename);
            }
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
    getRoomMessage: async (req, res, next) => {
        try {
            const findChat = await DetailChatRoomModel.findOne({ roomId: req.params._id }).populate(
                {
                    path: 'messages.senderId',
                },
            );
            if (!findChat) {
                return res.status(404).json({
                    sucess: true,
                    message: 'The chat room not found!',
                });
            }
            return res.status(200).json({
                sucess: true,
                data: findChat,
            });
        } catch (error) {
            return res.status(500).json({
                sucess: false,
                message: error.message,
            });
        }
    },
};
module.exports = messageController;
