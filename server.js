const express = require('express');
const hbs = require('hbs');
const nodemailer = require('nodemailer');

var {mongoose} = require('./server/db/mongoose');
var {Info} = require('./server/models/info');

var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.set('view engine', hbs);
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.render('main.hbs');
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    //res.send(req.body);
    var info = new Info(req.body);
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    info.save().then((doc) => {
        res.status(200).render('success.hbs');

        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass // generated ethereal password
                }
            });
    
            let mailOptions = {
                from: '"Baap" <tera@baap.com>', // sender address
                to: email, // list of receivers
                subject: 'You filled the form', // Subject line
                text: `Your name is ${firstName} ${lastName}`, // plain text body
                 // html body
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.send(`Email has been sent  ${nodemailer.getTestMessageUrl(info)}`);
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }, (e) => {
        res.status(400).render('error.hbs');
        console.log(e);
    });
});

// app.post('/send', (req, res) => {
//     nodemailer.createTestAccount((err, account) => {
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: account.user, // generated ethereal user
//                 pass: account.pass // generated ethereal password
//             }
//         });

//         let mailOptions = {
//             from: '"Baap" <tera@baap.com>', // sender address
//             to: email, // list of receivers
//             subject: 'You filled the form', // Subject line
//             text: `Your name is ${firstName} ${lastName}`, // plain text body
//              // html body
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);
//             // Preview only available when sending through an Ethereal account
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
//             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//         });
//     });
// });


app.listen(3000);
console.log(`Server is up on port 3000`);

module.exports = { app };