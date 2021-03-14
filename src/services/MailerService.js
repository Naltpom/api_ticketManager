require('babel-register');
const fs = require('fs');
const nodemailer = require("nodemailer");


module.exports = (req, res, next) => {
    if (req.body.mail === undefined) {
        return res.status(404).json('mail is not defined')
    }
    let options = req.body.mail;
    if (options.to === undefined || options.subject === undefined || options.text === undefined || options.html === undefined) {
        return res.status(404).json('"to, subject, text, html" something is missing in "mail"')
    }

    let mailTo = options.to;
    let mailSubject = options.subject ? options.subject : "Hello ✔";
    let mailText = options.text ? options.text : "verifyToken";
    let template = options.html;

    fs.readFile(`./templates/emails/${template}.html`, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            mailHtmlTemplate = data;

            for(var key in options){
                mailHtmlTemplate = mailHtmlTemplate.replace('%'+key+'%', options[key])
            }

            let transporter = nodemailer.createTransport({
                host: "ssl0.ovh.net",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: "ticket-manager@naltpom.fr", // generated ethereal user
                pass: "ticket-manager" // generated ethereal password
                },
            });

            transporter.sendMail({
                from: '"Nalt Pom 👻" <ticket-manager@naltpom.fr>', // sender address
                to: mailTo, // list of receivers
                subject: mailSubject, // Subject line
                text: mailText, // plain text body
                html: mailHtmlTemplate, // html body
            })
                .then(() => {console.log('envoyé'); res.status(200).json('email sended')})
                .catch(err => {err});
        }
    })
}
