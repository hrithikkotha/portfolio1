const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    message: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'read'],
        default: 'pending',
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;