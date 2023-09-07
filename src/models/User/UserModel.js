const mongoose = require('mongoose');

const groupEnrollSchema = new mongoose.Schema({
    name : String,
    id : String
});

// creating user mongoose Schema

const userSchema = new mongoose.Schema({

    name : {
        type: String,
        required : true
    },

    surname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    groups : {
        type : [groupEnrollSchema],
        required : true
    }
});



// creating user model

const User = mongoose.model('User', userSchema);

// exporting user model

module.exports = {User};