// AttendanceRecord.js

const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  smid: { type: String, required: true },
  location: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  scheduleDate: { type: String, required: true },
  arrivalTime: { type: String },
  attendance: { type: Boolean }
});

const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceRecordSchema);

module.exports = AttendanceRecord;
