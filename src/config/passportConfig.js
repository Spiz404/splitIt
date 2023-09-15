const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const {getUser} = require('../models/User/User.js');

module.exports = function(passport) {
    passport.use(
        new localStrategy({
            usernameField : 'email',
            passwordField : 'password'
            }, 
            async (email, password, done) => {
                try {
                    const data = await getUser(email);
                
                    if (data === null) {
                        console.log('null data');
                        return done(null, false, {message : "No user with that email"});
                    }

                    if(data) {
                        bcrypt.compare(password, data.password)
                            .then((result) => {
                                if (result) return done(null, data);
                                else return done(null, false);
                            }) 
                            .catch((err) => {throw err})
                    }
                }
                catch(error) {
                    throw error;
                }   
            })
    );

    passport.serializeUser(
        (user, cb) => {
            cb(null, user.email)
        }
    );

    passport.deserializeUser(
        async (email, cb) => {
            try {
                const data = await getUser(email);
                // data should be null if the user doesn't exists in the database
                return cb(null, data);
                
            }
            catch(error) {
                return cb(error, null);
            }
        }
    )
}