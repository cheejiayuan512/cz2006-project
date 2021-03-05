var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wheretomakaninsg@gmail.com',
        pass: 'MakanWhere2006'
    }
});

module.exports = nodemailer;