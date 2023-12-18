const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const ChatModel = mongoose.model('chat', ChatSchema);
module.exports = ChatModel;
