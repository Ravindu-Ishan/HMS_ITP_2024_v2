const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({

    smid: {
        type: String,
        required: true,
    },

    Location: {
        type: String,
        required: true
    },
    ScheduleTime: {
        type: String,
        required: true
    },
    ScheduleDate: {
        type: String,
        required: true
    }



});

module.exports = mongoose.model('Shifts', shiftSchema)
