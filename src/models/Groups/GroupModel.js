const mongoose = require("mongoose");
const operationSchema = require("../Operations/OperationSchemaAndModel.js").operationSchema;
const debtSchema = require("../Debts/DebtSchemaAndModel.js").debtSchema;

const GroupSchema = mongoose.Schema(
    {
        name : String,
        users : [String],
        debts : [debtSchema],
        operations : [operationSchema]
    }
);

const Group = mongoose.model('Group', GroupSchema);

module.exports = { Group };
