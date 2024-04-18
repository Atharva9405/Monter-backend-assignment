const nodemailer = require("nodemailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "atharvanagore2004@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "atharvanagore2004@gmail.com",
    to: email,
    subject: "Verify your account",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { generateOTP, sendOTPEmail };
