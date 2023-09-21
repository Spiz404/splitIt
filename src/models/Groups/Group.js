const G = require('./GroupModel.js');
const groupUtils = require('../../../utils/groupUtils.js');
const { Operation } = require('../Operations/OperationSchemaAndModel.js');
const userUtils = require('../../../utils/userUtils.js');
const InvitationLinkModel = require('../Groups/GroupInvitation.js').groupInvitationModel;
const crypto = require('crypto');

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
        await userUtils.addGroupToUser(founder, {name : data.name, id : data._id});
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

        // updating user's groups

        userUtils.addGroupToUser(userEmail, {name : groupData.name, id : groupData._id});
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

const addOperation = async (groupId, payer, partecipants, amount, date, description) => {

    try {
        const groupData = await groupUtils.findDocumentById(groupId);

        let operation = new Operation(
            {
                amount : amount,
                partecipants : partecipants,
                payer : payer,
                date : date,
                description : description
            }
        );
    
        groupData.operations.push(operation);
        
        const updatedDocument = await groupUtils.calculateDebts(groupData, {payer, partecipants, amount });

        await updatedDocument.save();
        
        return "operation saved correctly";

    }
    catch(error) {
        return "error : " + error;
    }

    
    
}

const getInvitationLink = async (groupId) => {
    // checking if a link already exists and it's not expired

    const data = await InvitationLinkModel.findOne({groupId : groupId}).lean().exec();
    

    // if an invitation link doesn't exists or it's expired, create a new one
    if (data === null || data.expirationDate < Date.now()) {
        // create a new invitation link
        try {

            const invitationLink = crypto.createHash('sha256').update(groupId).digest('hex');
            const newInvitationLink = new InvitationLinkModel(
                {
                    groupId : groupId,
                    invitationLink : invitationLink,
                    expiration : Date.now() + 86400000
                }
            );
            await newInvitationLink.save();
            return invitationLink;
        }
        catch (error) {
            console.log(error);
        }
        
    }

    // if the invitation link exists and it's still valid, return it

    return data.invitationLink;

}

const getGroupByInvitationLink = async (invitationLink) => {
    // console.log("invitationLink ", invitationLink);
    try {
        const data = await InvitationLinkModel.findOne({invitationLink : invitationLink}).lean().exec();
        if (data === null) throw new Error("Invitation link not found");
        // console.log("data ", data);
        // fetch group data
        const {groupId} = data;

        const groupData = await groupUtils.findDocumentById(groupId);
        // console.log("groupData ", groupData);
        return {...groupData, expiration : data.expiration}
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = { newGroup, deleteGroup, getGroup, addUserToGroup, removeUserFromGroup, addOperation, getInvitationLink, getGroupByInvitationLink };