const mongoose = require('mongoose');

const userLeavesViewSchema = new mongoose.Schema({

    smid: {
        type: String,
        required: true,
    },

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
    }
    


});

module.exports = mongoose.model('UserLeavesView', userLeavesViewSchema)
