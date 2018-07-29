const express = require('express');
const hbs = require('hbs');

var {mongoose} = require('./server/db/mongoose');
var {info} = require('./server/models/info');

var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('main.hbs');
});

app.post('/submit', (req, res) => {
    var info = new info(req.body);
    info.save().then((doc) => {
        res.status(200).send(`saved succesfully 
        ${doc}`);
    }, (e) => {
        res.status(400).send(`error occurred while saving
        ${e}  `);
    });
});


app.listen(3000);
console.log(`Server is up on port 3000`);

module.exports = { app };