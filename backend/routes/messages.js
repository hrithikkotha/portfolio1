const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log('DEBUG: EMAIL_USER =', process.env.EMAIL_USER);
console.log('DEBUG: EMAIL_PASS =', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter when the module loads so issues appear in server logs early
transporter.verify()
    .then(() => console.log('Nodemailer transporter verified and ready'))
    .catch(err => console.error('Nodemailer verification failed:', err));

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            console.warn('Validation failed: missing fields', { name, email, message });
            return res.status(400).json({ success: false, message: 'Please provide name, email and message.' });
        }

        // Save message to DB
        const saved = await Message.create({ name, email, message });

        // If email credentials are not set, don't attempt to send email — return success about saved message
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('EMAIL_USER or EMAIL_PASS not configured. Message saved but email not sent.');
            return res.status(200).json({ success: true, message: 'Message saved (email not sent — email not configured).' });
        }

        // Try to send notification email
        try {
            await transporter.sendMail({
                from: `"Portfolio Contact" <${email}>`,
                to: process.env.EMAIL_USER,
                subject: 'New Portfolio Message',
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
            });
        } catch (mailErr) {
            console.error('Error sending email notification:', mailErr);
            // Message is saved — inform client about email failure but return success for save
            return res.status(200).json({ success: true, message: 'Message saved but failed to send email notification.' });
        }

        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('Error in /api/messages route:', err);
        return res.status(500).json({ success: false, message: 'Failed to process message. Check server logs.' });
    }
});

module.exports = router;