const nodemailer = require('nodemailer');
require('dotenv').config();

const sendVerificationEmail = (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Use this code to verify your account: ${code}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
