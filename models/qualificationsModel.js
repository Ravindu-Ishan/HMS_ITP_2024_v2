const mongoose = require('mongoose');

const qualificationsSchema = mongoose.Schema(
    {
        smid: {
            type: String,
            required: true,
        },
        docName: {
            type: String,
            required: true,
        },
        docDescription: {
            type: String,
            required: true,
        },
        docPath: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        }
    }
);


module.exports = mongoose.model('qualification', qualificationsSchema);