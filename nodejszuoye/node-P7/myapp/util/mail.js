const nodemailer = require('nodemailer');
const Log = require('./log');


let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secureConnection: true,
    secure: true,
    auth: {
        user: 'zhangyuecoder@qq.com',
        pass: 'jrbfudeuxlhacaff'
    }
});
let mailOptions = {
    from: 'ZhangYue Node Warning<zhangyuecoder@qq.com>',
    to: '423257356@qq.com',
    subject: '',
    text: '',
    html: ''
};

function send(subject, content) {
    if (subject && content) {
        mailOptions.subject = subject;
        mailOptions.text = content;
        transporter.sendMail(mailOptions, (error, info) => {
            Log.log(`Message: ${info.messageId}`);
            Log.log(`sent: ${info.response}`);
        });
        sendTime = new Date().getTime();
    }
}
module.exports = {
    send: send
};