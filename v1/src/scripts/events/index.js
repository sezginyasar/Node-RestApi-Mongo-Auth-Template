const eventEmitter = require('./eventEmitter');
const nodemailer = require('nodemailer');
const logger = require('../logger/Events');

module.exports = () => {
    eventEmitter.on("send_email", (emailData) => {

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        let info = transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...emailData,
        });

        logger.log({
            level: "info",
            message: `Password reset = ${emailData.to}`
        })
    });
};