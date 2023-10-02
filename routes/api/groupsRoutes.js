const groupController = require('../../src/controllers/groupController.js');
const router = require('express').Router();
const {isAuthenticated} = require('../../utils/middlewares/auth.js');

router.use(isAuthenticated);

router.route('/')
    .get(groupController.getGroupInfo)
    .post(groupController.newGroup)
    .delete(groupController.deleteGroup);

router.route('/handleGroupUsers')
    .post(groupController.addUserToGroup)
    .delete(groupController.removeUserFromGroup);

router.route('/handleOperations')
    .post(groupController.addOperation);

router.route('/invite')
    .get(groupController.getInvitationLink)
    .post(groupController.addUserToGroupByLink)
module.exports = { router };

