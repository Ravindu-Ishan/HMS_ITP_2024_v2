// UserLeavesViewRoute.js
const express = require('express');
const UserLeavesView = require('../models/UserLeavesViewModel'); // Ensure the correct path
const router = express.Router();

// Save leave
router.post('/user/userLeaves/save', async (req, res) => {
    try {
        const newLeave = new UserLeavesView(req.body);
        await newLeave.save();
        res.status(200).json({ success: "Leave saved successfully" });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});

// Get all leaves
router.get('/user/userLeaves', async (req, res) => {
    try {
        const leaves = await UserLeavesView.find().exec();
        res.status(200).json({ success: true, existingLeaves: leaves });
    } catch (error) {
        console.error("Error fetching leaves:", error);
        res.status(400).json({ success: false, error: "Failed to fetch leaves" });
    }
});

// Get a specific leave by ID
router.get('/user/userLeaves/getbyID/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const leave = await UserLeavesView.findById(id);

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave not found" });
        }

        return res.status(200).json({
            success: true,
            leave
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});

// Get leaves by staff member ID (smid)
router.get('/user/userLeaves/getonly/:smid', async (req, res) => {
    try {
        const { smid } = req.params;
        const leaves = await UserLeavesView.find({ smid: smid }).exec();
        return res.status(200).json({
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        console.error("Error fetching leaves by smid:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update leave
router.put('/user/userLeaves/update/:id', async (req, res) => {
    try {
        const leave = await UserLeavesView.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!leave) {
            return res.status(404).json({ error: "Leave not found" });
        }
        return res.status(200).json({ success: "Updated Successfully", leave });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// Delete leave
router.delete('/user/userLeaves/delete/:id', async (req, res) => {
    try {
        const deletedLeave = await UserLeavesView.findByIdAndDelete(req.params.id).exec();
        if (!deletedLeave) {
            return res.status(404).json({ message: "Delete unsuccessful: Leave not found" });
        }
        return res.status(200).json({ message: "Delete successful", deletedLeave });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;
