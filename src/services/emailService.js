const nodemailer = require('nodemailer');

require('dotenv').config();

async function sendEmail(apiKeys) {
    try {
        // Create SMTP transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const htmlContent = `
            <h1>OSCAR.MEME New API Keys Generated</h1>
            <p>API Key:</p>
            <ul>
                ${apiKeys.map(apiKey => `<li>${apiKey}</li>`).join('')}
            </ul>
        `;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'New API Key Generated - OSCAR.MEME',
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail };
