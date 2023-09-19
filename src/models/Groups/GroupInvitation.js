const mongoose = require('mongoose');

const groupInvitationLinkSchema = new mongoose.Schema({
    groupId : {
        type : String,
        required : true,
        unique: true 
    },
    invitationLink : {
        type : String,
        required : true,
        unique : true
    },
    expiration : {
        type : Date,
        required : true
    }
});

const groupInvitationModel = mongoose.model("groupInvitationLink", groupInvitationLinkSchema);

module.exports = { groupInvitationModel };