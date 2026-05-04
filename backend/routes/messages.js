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

        // Field-specific validation
        const errors = {};
        if (!name || name.trim().length < 2) {
            errors.name = 'Please enter your full name (at least 2 characters).';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!message || message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long.';
        }
        if (Object.keys(errors).length > 0) {
            console.warn('Validation failed:', errors);
            return res.status(400).json({ success: false, errors, message: 'Please fix the errors below.' });
        }

        // Save message to DB
        await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });

        // If Resend not configured, still count it as success for the user
        if (!process.env.RESEND_API_KEY || !process.env.EMAIL_USER) {
            console.warn('RESEND_API_KEY or EMAIL_USER not configured. Message saved but email not sent.');
            return res.status(200).json({ success: true, message: "Thanks for reaching out! I'll get back to you soon." });
        }

        // Try to send notification email via Resend
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: process.env.EMAIL_USER,
                replyTo: email.trim(),
                subject: 'New Portfolio Message from ' + name.trim(),
                html: `
                    <h2>New message from your portfolio contact form</h2>
                    <p><strong>Name:</strong> ${name.trim()}</p>
                    <p><strong>Email:</strong> ${email.trim()}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.trim().replace(/\n/g, '<br>')}</p>
                `
            });
            console.log('Email sent successfully via Resend');
        } catch (mailErr) {
            console.error('Error sending email notification:', mailErr);
            // Message is saved — show user-friendly success, log internally
            return res.status(200).json({ success: true, message: "Thanks for reaching out! I'll get back to you soon." });
        }

        return res.status(200).json({ success: true, message: "Message sent! Thanks for reaching out — I'll reply shortly." });
    } catch (err) {
        console.error('Error in /api/messages route:', err);
        return res.status(500).json({ success: false, message: 'Something went wrong on our end. Please try again in a moment.' });
    }
});

module.exports = router;