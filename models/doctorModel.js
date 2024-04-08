const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
    {
        staff_NIC: {
            type: String,
            unique: true,
            required: true,
        },
        specialisation: {
            type: String,
            required: true,
        }
    }
);

module.exports = mongoose.model('doctor', doctorSchema);

