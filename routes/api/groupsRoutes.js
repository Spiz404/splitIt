const groupController = require('../../src/controllers/groupController.js');
const router = require('express').Router();


router.route('/')
    .get(groupController.getGroupInfo)
    .post(groupController.newGroup)
    .delete(groupController.deleteGroup);

router.route('/handleGroupUsers')
    .post(groupController.addUserToGroup)
    .delete(groupController.removeUserFromGroup);

router.route('/handleOperations')
    .post(groupController.addOperation);

module.exports = { router };


