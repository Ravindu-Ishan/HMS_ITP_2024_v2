const mongoose = require('mongoose');

const userLeavesViewSchema = new mongoose.Schema({

    leaveDate: {
        type: String,
        required: true,
    },
    leaveName: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    leaveReason: {
        type: String,
        required: true
    },
    leaveDuration: {
        type: String,
        required: true
    },
    


});

module.exports = mongoose.model('UserLeavesView', userLeavesViewSchema)
