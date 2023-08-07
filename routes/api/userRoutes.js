const userController = require('../../src/controllers/userController.js');
const router = require('express').Router();

router.route('/')
    .get((req, res) => { res.send("get per user"); })
    .post(userController.newUser)
    .put(userController.updateUserRegistry)
    .delete(userController.deleteUser);

module.exports = { router };
