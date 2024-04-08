const mongoose = require('mongoose');

const branchSchema = mongoose.Schema(
    {
        branchName: {
            type: String,
            unique: true,
            required: true,
        },
        branchLocation: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('branch', branchSchema);

