const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS  // Your Gmail app password
        }
    });

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

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
}
