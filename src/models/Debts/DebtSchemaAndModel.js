const mongoose = require('mongoose');

const debtSchema = mongoose.Schema(
    {
        creditor : String,
        debitor : String,
        debt : Number
    }
);

const Debt = mongoose.model('Debt', debtSchema);

module.exports = { debtSchema, Debt };