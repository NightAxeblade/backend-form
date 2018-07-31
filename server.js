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
    info.save().then((doc) => {
        res.status(200).render('success.hbs');
    }, (e) => {
        res.status(400).render('error.hbs');
    });
});

app.post('/send', (req, res) => {

})


app.listen(3000);
console.log(`Server is up on port 3000`);

module.exports = { app };