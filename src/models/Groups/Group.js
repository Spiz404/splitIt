const G = require('./GroupModel.js');
const groupUtils = require('../../../utils/groupUtils.js');
const { Operation } = require('../Operations/OperationSchemaAndModel.js');

const newGroup = async (groupName, founder) => {

    let newGroup = new G.Group(
        {
            name : groupName,
            users : [founder],
            debts : [],
            operations : []

        }
    );
    try {
        const data = await newGroup.save();
        return "Group created correctly";
    }
    catch(error) {
        return "Group creation failed, error : " + error;
    }
};

const deleteGroup = async (groupId) => {

    try {
        await G.Group.deleteOne({__id : groupId});
        return "Group deleted correctly";
    }
    catch (error) {
        return "Group deleting failed";
    }

};

const getGroup = async (groupId) => {

    try {
        const data = await G.Group.findById(groupId).lean().exec();
        return data;
    }
    catch(error) {
        return "error : " + error;
    }
};

const addUserToGroup = async (groupId, userEmail) => {

    try {
        
        const groupData = await groupUtils.findDocumentById(groupId);
        groupData.users.push(userEmail);
        await groupData.save();
        return `user ${userEmail} correctly added to ${groupId} group`;

    }
    catch(error){
        return `error while adding ${userEmail} to group ${groupId}, error : ` + error;
    }
};

const removeUserFromGroup = async (groupId, userEmail) => {
    
    try {
       
        const groupData = await groupUtils.findDocumentById(groupId);
        groupData.users.pull(userEmail);
        await groupData.save();
        return `user ${userEmail} correctly removed to ${groupId} group`;
    }
    catch(error){
        return `error while removing ${userEmail} to group ${groupId}, error : ` + error;
    }
    
}

// partecipants should be an array

const addOperation = async (groupId, payer, partecipants, amount, date) => {

    try {
        const groupData = await groupUtils.findDocumentById(groupId);

        let operation = new Operation(
            {
                amount : amount,
                partecipants : partecipants,
                payer : payer,
                date : date
            }
        );
    
        groupData.operations.push(operation);
        


        // groupData.save();

        const updatedDocument = await groupUtils.calculateDebts(groupData, {payer, partecipants, amount });

        await updatedDocument.save();
        
        return "operation saved correctly";

    }
    catch(error) {
        return "error : " + error;
    }

    
    
}

module.exports = { newGroup, deleteGroup, getGroup, addUserToGroup, removeUserFromGroup, addOperation };