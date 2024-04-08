const mongoose = require('mongoose');

const staffSchema = mongoose.Schema(
    {
        staff_NIC: {
            type: String,
            unique: true,
            required: true,
        },
        staffName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('staff', staffSchema);

