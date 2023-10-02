require('./config/db.js');
require('dotenv').config();
require('nodemon');
const {getUser, verifyPassword} = require('./models/User/User.js');
const {requestLogger} = require('../utils/middlewares/requestLogger.js')
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('../routes/api/userRoutes.js').router;
const groupRoutes = require('../routes/api/groupsRoutes.js').router;
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {newUser} = require('./controllers/userController.js');
const FileStore = require('session-file-store')(session);
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;

app.use(express.json());

app.use(cookieParser());

app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true,
        saveUninitialized: true
    }
));

app.use(
    session({
        store : new FileStore(),
        secret : "segreto",
        resave : false,
        saveUninitialized : true ,
        // setting cookie life time to 3 days
        cookie : {
            maxAge : 1000 * 60 * 60 * 24 * 3
        }
    })
)
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

app.use(cookieParser("segreto"))

app.use(passport.initialize());
app.use(passport.session());

require('./config/passportConfig.js')(passport);

app.use(requestLogger);

app.use((req, res, next) => {
    console.log("checking if request is authenticated")
    console.log(req.isAuthenticated());
    next();
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/user', userRoutes);

app.use('/group', groupRoutes);

app.post('/login', (req, res, next) => { 

    console.log("session id funzione login", req.sessionID);
    passport.authenticate('local',    
    (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(401).send("No user with that email");
        else {
            req.login(user, (err) => {
                if (err) throw err;
                res.send(user.email);
            })
        }
    })(req, res, next);

});

app.post('/register', async (req, res) => {
    
    console.log(req.body);

    try {
        await newUser(req, res);
    }
    catch(err) {
        console.log(err);
        res.status(501).send();
    }
    
});

app.post('/logout', (req, res) => {

    console.log(req.sessionID);
    req.logout(() => {
        console.log("logged out");

    });

});

app.get('/test', (req, res) => {
    
    console.log(req.sessionID);
    console.log(req.user);
    res.set('test', 'test')
    res.send();
})

app.listen(port, () => {
    console.log("app listening on port " + port);
});


app.use('/group', groupRoutes);