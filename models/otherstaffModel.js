const mongoose = require('mongoose');

const otherstaffModel = mongoose.Schema(
    {
        staff_NIC: {
            type: String,
            unique: true,
            required: true,
        },
        branchName: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('otherstaff', otherstaffModel);

