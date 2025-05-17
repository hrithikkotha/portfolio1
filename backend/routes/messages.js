const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Route to handle feedback form submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});


module.exports = router;