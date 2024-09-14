const nodemailer = require('nodemailer');

const sendVerificationEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: { name: 'Login Portal', address: process.env.EMAIL }, 
        to: [email],
        subject: 'Email Verification',
        text: `Please verify your email using this link: http://localhost:3000/verify/${token}`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(`Verification email sent: ${info.response}`);
    });
};


module.exports = { sendVerificationEmail };
