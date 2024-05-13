const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    smid: {
        type: String,
        required: true,
    },

    AttendanceName: {
        type: String,
        required: true
    },
    AttendanceLocation: {
        type: String,
        required: true
    },
    AttendanceDate: {
        type: String,
        required: true
    },
    AttendanceShiftTime: {
        type: String,
        required: true
    },
    AttendanceArrivalTime: {
        type: String,
        required: true
    }



});

module.exports = mongoose.model('Attendance', attendanceSchema)