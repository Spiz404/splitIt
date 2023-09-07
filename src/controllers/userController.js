const userDbFunctions = require('../../src/models/User/User.js');

const getUserInfo = async (req, res) => {

    const userEmail = req.query.email;
    const data = await userDbFunctions.getUser(userEmail);
    res.send(data);

};

const newUser = async (req, res) => {

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const data = await userDbFunctions.createNewUser({userName : name, userSurname : surname, userEmail : email, password : password});
    res.send(data);
}

const updateUserRegistry  = async (req, res) => {

    const email = req.body.email;

    // default value in the form will be the already stored data

    const newName = req.body.name;
    const newSurname = req.body.surname;
    const data = await userDbFunctions.updateUser(email, ["name", "surname"], [newName, newSurname]);

    res.send(data);

}


const deleteUser = async (req, res) => {
    
    const email = req.body.email;
    const data = await userDbFunctions.deleteUser(email);
    res.send(data);
    

}

/* function that returns the groups of the user with the given email */

const getUserGroups = async (req, res) => {
    
    //console.log(req);
    const userEmail = req.query.email;
    const data = await userDbFunctions.getUser(userEmail);
    try {
        res.send(data?.groups);
    }
    catch (err) {
        console.log("error: " + err);
    }
    
    
}

module.exports = { newUser, updateUserRegistry, deleteUser, getUserGroups, getUserInfo };