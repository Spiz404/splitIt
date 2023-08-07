require('./config/db.js');
require('dotenv').config();
require('nodemon');
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('../routes/api/userRoutes.js').router;
const groupRoutes = require('../routes/api/groupsRoutes.js').router;
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/user', userRoutes);

app.use('/group', groupRoutes);

app.listen(port, () => {
    console.log("app listening on port " + port);
});


app.use('/group', groupRoutes);