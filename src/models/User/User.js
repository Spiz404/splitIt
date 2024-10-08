const U = require('./UserModel.js');
require('../../config/db.js');
const bcrypt = require('bcryptjs');
/* function that returns the user document with the given email */


const getUser = async (userEmail) => {
    // console.log("funzione getUser", userEmail);
    let userData = await U.User.findOne({email : userEmail}).exec();
    // console.log("funzione getUser, risposta", userData);
    return userData;

}

/* function that creates a new user document in the database */

const createNewUser  = async ( {userName, userSurname, userEmail, password} ) => {
    
    const hashedPassword = await bcrypt.hash(password, 10);  
    let newUser = new U.User(

        {
            name : userName,
            surname : userSurname,
            email : userEmail,
            password : hashedPassword
        }
        
    );

    // U.User.findOne({email : userEmail})
    // .then((user) => {
    //     console.log("createNewUser" , user);
        
    //     // if an user already exists, return 1
    //     if (user) {
    //         console.log("sono qui");
    //         return {ret : 1, error : "user already exists"};

    //     } 
            
        
    //     newUser.save()
    //     .then (
    //         () => {return 0}
    //     )
    //     .catch (
    //         (err) => {return {ret : 1, error : err}}
    //     )
    // }).catch(
    //     err => { return {ret : 2, error : err} }
    // ) 
    try {
        const data = U.User.findOne({email : userEmail}).exec();
        const savedUser = await newUser.save();
        // if (data) {
        //     throw new Error ("user already exists");
        // }

        return {ret : 0, error : null};
    }
    catch(error) {
        console.log(error);
        return {ret : 1, error : "duplicate keys"};
    }

};

/* function that deletes the user with the given email from the database */

const deleteUser = async (userEmail) => {

    try {

        const data = await U.User.deleteOne({ email : userEmail });
        return "user deleted correctly";

    }

    catch(error) {

        return "error : " + error;

    }
};

/*
    function that update every field of the user document in the toUpdate parameter
    with the corrisponding new value in the newValues array.
    If the two array's length differs, an error will be thrown.
*/

const updateUser = async (userEmail, toUpdate, newValues) => {

    try {

        const filter = {email : userEmail};
        const update = {};
        if (toUpdate.length != newValues.length) {
            throw("toUpdate array and newValues arrays length doesn't match.");
        }

        for (let i = 0; i < toUpdate.length; i++) {
            update[toUpdate[i]] = newValues[i];
        }

        const data = await U.User.findOneAndUpdate(filter, update);

        return "user data updated correctly";

    }
    catch(error) {
        console.log(error);
        return "error : " + error;
    }
};

/*
    function that fetches all the groups in which the user with the given email is enrolled
*/


module.exports = { createNewUser, deleteUser, updateUser, getUser };