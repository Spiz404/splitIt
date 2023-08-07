const userDbFunctions = require('../../src/models/User/User.js');

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



module.exports = { newUser, updateUserRegistry, deleteUser };