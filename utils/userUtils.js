const mongoose = require('mongoose');

const User = require('../src/models/User/UserModel.js').User;


const findUserByEmail = async (email) => {
    
    const userData = await User.findOne({email : email}).exec();
    //console.log("func findUserByEmail", userData);
    return userData;

}

const addGroupToUser = async (userEmail, group) => {
        //console.log("func addGroupToUser", userEmail);
        const userData = await findUserByEmail(userEmail);
        //console.log("dati utente", userData);

        userData.groups.push(group);
        await userData.save();

};

module.exports = {addGroupToUser};

