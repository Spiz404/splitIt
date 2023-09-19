const groupDbFunctions = require('../models/Groups/Group.js');

const getGroupInfo = async (req, res) => {
    const id = req.query.id;
    const data = await groupDbFunctions.getGroup(id);
    res.json(data);

}

const newGroup  = async (req, res) => {
    const name = req.body.name;
    const founder = req.body.email;
    const data = await groupDbFunctions.newGroup(name, founder);
    
    res.send(data);

};

const deleteGroup = async (req, res) => {

    const id = req.body.id;

    const data = await groupDbFunctions.deleteGroup(id);

    res.json(data);
};

const addUserToGroup = async (req, res) => {

    const groupId = req.body.id;
    const userEmail = req.body.email;
    const data = await groupDbFunctions.addUserToGroup(groupId, userEmail);
    res.json(data);

};

const removeUserFromGroup = async (req, res) => {
    
    const groupId = req.body.id;
    const userEmail = req.body.email;
    const data = await groupDbFunctions.removeUserFromGroup(groupId, userEmail);
    res.json(data);

};

const addOperation = async (req, res) => {
    
    const {id : groupId, payer, partecipants, amount, date} = req.body.operation;
    const data = await groupDbFunctions.addOperation(groupId, payer, partecipants, amount, date);
    res.json(data);

}

const getInvitationLink = async (req, res) => {
    console.log("qui ci arrivo");
    const {group} = req.query;
    const link = await groupDbFunctions.getInvitationLink(group);
    console.log(link);
    res.json('http://localhost:5173/groups/invite/' + link);
}

const addUserToGroupByLink = async (req, res) => {
    const {link, user} = req.body;
    const data = await groupDbFunctions.getGroupByInvitationLink(link);
    console.log(data);
    // check if the user is already in the group

    const groupUsers = data._doc.users;
    
    if (groupUsers.includes(user)) res.json({"result" : 1,"message" : "user already in the group"});
    
    else {
        const result = await groupDbFunctions.addUserToGroup(data._doc._id, user);
        res.json({"result" : 0, "message" : "user correctly added to the group"});
    }
    

};



module.exports = { getGroupInfo, newGroup, deleteGroup, addUserToGroup, removeUserFromGroup, addOperation, getInvitationLink, addUserToGroupByLink };