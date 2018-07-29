var mongoose = require('mongoose');

var Info = mongoose.model('Info', {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    Address: {
        type: String
    },
    City: {
        type: String
    },
    State: {
        type: String
    },
    Zip: {
        type: Number
    }
});

module.exports = { Info };