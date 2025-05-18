const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Route to handle feedback form submission
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await Message.create({ name, email, message });
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }
});


module.exports = router;