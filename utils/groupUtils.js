const mongoose = require('mongoose');
const Group = require('../src/models/Groups/GroupModel.js').Group;
const Debt = require('../src/models/Debts/DebtSchemaAndModel.js').Debt;
const findDocumentById = async (id) => {

    const data = await Group.findById(id).exec();
    return data;

};

const calculateDebts =  async (groupDocument, operation) => {

    const {payer, partecipants, amount} = operation;
    let debts = groupDocument.get('debts');
    console.log(debts);
    // logic explained
    /*
        first I check if an array for the payer and one of the partecipants
        exists in the debts array

        cases:
            - it exists -> update the value, value can either be positive or negative, 
                        depends on the debt
            - it doesn't exists -> create the pair in the array and use the value as debt

    */
    let count = 0;
    let foundUsers = [];

    for (let debt of debts) {
        
        if (debt.creditor == payer) {
            debt.debt += amount / partecipants.length;
            foundUsers.push(debt.debitor);
            count ++;
        }
                
        else if (debt.debitor == payer) {
            debt.debt -= amount / partecipants.length;
            foundUsers.push(debt.creditor);
            count ++;
        }

    }

    // a pair payer, debitor doesn't exists in the array
    if (count != partecipants.length) {

        let newUsers = partecipants.filter(x => !foundUsers.includes(x));
        for(let newUser of newUsers) {
            if (payer != newUser) {
                debts.push(new Debt(
                    {
                        creditor : payer,
                        debitor : newUser,
                        debt : amount / partecipants.length
                    }
                ));
            }
        }

    }
    console.log("generated debts array: " + debts);
    
    groupDocument.debts = debts;
    console.log(groupDocument.toObject());
    return groupDocument;
};


module.exports = {findDocumentById, calculateDebts};