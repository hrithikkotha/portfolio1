const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Route to handle feedback form submission
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle feedback form submission
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await Message.create({ name, email, message });

        // Send email notification
        await transporter.sendMail({
            from: `"Portfolio Contact" <${email}>`,
            to: process.env.EMAIL_USER, 
            subject: 'New Portfolio Message',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }
});


module.exports = router;