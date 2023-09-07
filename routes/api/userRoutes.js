const userController = require('../../src/controllers/userController.js');
const router = require('express').Router();

router.route('/')
    .get(userController.getUserInfo)
    .post(userController.newUser)
    .put(userController.updateUserRegistry)
    .delete(userController.deleteUser);

router.route('/userGroups')
    .get(userController.getUserGroups);

module.exports = { router };
