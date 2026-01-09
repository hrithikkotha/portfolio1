const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { Resend } = require('resend');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log('DEBUG: RESEND_API_KEY =', process.env.RESEND_API_KEY ? 'set' : 'undefined');
console.log('DEBUG: EMAIL_USER =', process.env.EMAIL_USER);

const resend = new Resend(process.env.RESEND_API_KEY);

if (process.env.RESEND_API_KEY) {
    console.log('Resend API key configured');
} else {
    console.warn('RESEND_API_KEY not configured - email sending will be disabled');
}

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

        // If Resend API key is not set, don't attempt to send email — return success about saved message
        if (!process.env.RESEND_API_KEY || !process.env.EMAIL_USER) {
            console.warn('RESEND_API_KEY or EMAIL_USER not configured. Message saved but email not sent.');
            return res.status(200).json({ success: true, message: 'Message saved (email not sent — email not configured).' });
        }

        // Try to send notification email via Resend
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: process.env.EMAIL_USER,
                replyTo: email,
                subject: 'New Portfolio Message from ' + name,
                html: `
                    <h2>New message from your portfolio contact form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `
            });
            console.log('Email sent successfully via Resend');
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