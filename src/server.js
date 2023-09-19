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
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true,
        saveUninitialized: true
    }
));

app.use(requestLogger);

app.use(
    session({
        secret : "segreto",
        resave : true,
        saveUninitialized : true 
    })
)

app.use(cookieParser("segreto"))

app.use(passport.initialize());
app.use(passport.session());

require('./config/passportConfig.js')(passport);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/user', userRoutes);

app.use('/group', groupRoutes);

app.post('/login', (req, res, next) => { 
    passport.authenticate('local',    
    (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(401).send("No user with that email");
        else {
            req.login(user, (err) => {
                if (err) throw err;
                res.send("Successfully authenticated");
            })
        }
    })(req, res, next);
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    await newUser(req, res);
});

app.get('/test', (req, res) => {
    // console.log('test route, user object in request');
    console.log(req.user);
    res.send();
})

app.listen(port, () => {
    console.log("app listening on port " + port);
});


app.use('/group', groupRoutes);