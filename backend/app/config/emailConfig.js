// const dotenv=require('dotenv')
// dotenv.config()
// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false, // true for 465, false for other ports
//     auth: {
//        user: process.env.EMAIL_USER, // Admin Gmail ID
//       pass: process.env.EMAIL_PASS, // Admin Gmail Password
//     },
//   })
  
//   module.exports= transporter


const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const port = Number(process.env.EMAIL_PORT) || 587;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: port,
  secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
  requireTLS: port === 587, // Enforces encrypted connection on port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // MUST be a Google App Password
  },
});

// Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Nodemailer Transporter Error:', error.message);
  } else {
    console.log('✅ SMTP Transporter is ready to send emails');
  }
});

module.exports = transporter;