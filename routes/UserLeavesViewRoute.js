const express = require('express');
const UserLeavesView = require('../models/UserLeavesViewModel'); // Import the correct model
const router = express.Router();

// Save leave entry
router.post('/user/userLeaves/save', async (req, res) => {
    try {
        const newLeaveEntry = new UserLeavesView(req.body); // Use the new model
        await newLeaveEntry.save();
        res.status(200).json({ success: "Leave entry saved successfully" });
    } catch (error) {
        return res.status(400).json({
            error: error.message || "Failed to save leave entry"
        });
    }
});

// Get leave entries
router.get('/user/userLeaves', async (req, res) => {
    try {
        const leaveEntries = await UserLeavesView.find().exec(); // Use the new model
        res.status(200).json({ success: true, existingLeaveEntries: leaveEntries });
    } catch (error) {
        console.error("Error fetching leave entries:", error);
        res.status(400).json({ success: false, error: "Failed to fetch leave entries" });
    }
});

// Get a specific leave entry by ID
router.get('/user/userLeaves/getbyID/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const leaveEntry = await UserLeavesView.findById(id); // Use the new model

        if (!leaveEntry) {
            return res.status(404).json({ success: false, message: "Leave entry not found" });
        }

        return res.status(200).json({
            success: true,
            leaveEntry
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message || "Failed to get leave entry" });
    }
});

// Update leave entry
router.put('/user/userLeaves/update/:id', async (req, res) => {
    try {
        const leaveEntry = await UserLeavesView.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!leaveEntry) {
            return res.status(404).json({ error: "Leave entry not found" });
        }
        return res.status(200).json({ success: "Leave entry updated successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message || "Failed to update leave entry" });
    }
});

// Delete leave entry
router.delete('/user/userLeaves/delete/:id', async (req, res) => {
    try {
        const deletedLeaveEntry = await UserLeavesView.findByIdAndDelete(req.params.id).exec();
        if (!deletedLeaveEntry) {
            return res.status(404).json({ message: "Delete unsuccessful: Leave entry not found" });
        }
        return res.json({ message: "Leave entry deleted successfully", deletedLeaveEntry });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;
