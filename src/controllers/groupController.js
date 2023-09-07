const groupDbFunctions = require('../models/Groups/Group.js');

const getGroupInfo = async (req, res) => {

    const id = req.body.id;
    const data = await groupDbFunctions.getGroup(id);
    res.json(data);

}

const newGroup  = async (req, res) => {

    const name = req.body.name;
    const founder = req.body.email;
    //console.log("dati richiesta: ", name, founder);
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

module.exports = { getGroupInfo, newGroup, deleteGroup, addUserToGroup, removeUserFromGroup, addOperation };