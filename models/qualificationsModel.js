const mongoose = require('mongoose');

const qualificationsSchema = mongoose.Schema(
    {
        staff_NIC: {
            type: String,
            required: true,
        },
        document: {
            type: String,
            required: true,
        },
        docDescription: {
            type: String,
            required: true,
        }
    }
);


module.exports = mongoose.model('qualification', qualificationsSchema);