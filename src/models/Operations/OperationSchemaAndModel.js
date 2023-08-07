const mongoose = require('mongoose');

const operationSchema = mongoose.Schema({

    
    amount : Number,
    partecipants : [String],
    payer : String,
    date : Date
    
});

const Operation = mongoose.model('Operation', operationSchema);

// exporting both schema and model
// exporting the schema is necessary for defining the Group Schema

module.exports = {operationSchema, Operation };