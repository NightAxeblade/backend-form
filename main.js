const express = require('express');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;

var app = express();

app.set('view engine','hbs');

MongoClient.connect('mongodb://localhost:27017/minproj', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB');

    app.get('/', (req, res) => {
        res.render('main.hbs');


   
        
        function getChar(callback) {
            db.collection('Info').insertOne(req.body, (err, result) => {
                if (err) {
                    //return res.render('error.hbs');
                    return callback(undefined, err);
                }
                
                //return res.render('success.hbs');
                return callback(result, undefined);
            });
        }

        // manualInsert(req.body, (result, err) => {
        //     if(err) {

        //     }
        // });
        
    });
    


    app.listen(3000);
    console.log(`Server is up on port 3000`);

    db.close();
});


