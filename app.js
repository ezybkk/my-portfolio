// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail SMTP server
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
    }
});

// API Endpoint for Form Submission
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Email options
    const mailOptions = {
        from: `${name} via Portfolio <${process.env.EMAIL_USER}>`, // The sender's name and your email address
        to: process.env.EMAIL_USER,                               // Your email address as the recipient
        subject: `New Message from Portfolio by ${name}`,          // Email subject
        text: `You have received a new message from your portfolio contact form:
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send message.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
