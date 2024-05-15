// attendanceRoutes.js

const express = require('express');
const router = express.Router();
const AttendanceRecord = require('../models/AttendanceModel');

// Route to insert attendance records
router.post('/main/batchInsert', async (req, res) => {
  try {
    const attendanceRecords = req.body;
    const insertedRecords = await AttendanceRecord.insertMany(attendanceRecords);
    res.json(insertedRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
