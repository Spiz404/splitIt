const U = require('./UserModel.js');
require('../../config/db.js');

const createNewUser  = async ( {userName, userSurname, userEmail, password} ) => {

    let newUser = new U.User(
        {
            name : userName,
            surname : userSurname,
            email : userEmail,
            password : password
        }
    );

    try {

        const data = await newUser.save();
        return "user saved correctly";

    }
    catch(error) {

        return "error : " + error;

    }
    
};

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


module.exports = { createNewUser, deleteUser, updateUser };