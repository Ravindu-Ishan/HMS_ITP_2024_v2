const express = require('express');
const Prescriptions = require('../models/prescriptions');

const router = express.Router();

// Save prescription
router.post('/prescription/save', async (req, res) => {
    try {
        let newPrescription = new Prescriptions(req.body);
        await newPrescription.save();
        return res.status(200).json({
            success: "Prescription saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get all prescriptions
router.get('/prescriptions', async (req, res) => {
    try {
        const prescriptions = await Prescriptions.find().exec();
        return res.status(200).json({
            success: true,
            existingPrescriptions: prescriptions
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

// Get a specific prescription by ID
router.get("/prescription/:id", async (req, res) => {
    try {
        const prescription = await Prescriptions.findById(req.params.id).exec();
        if (!prescription) {
            return res.status(404).json({ success: false, error: "Prescription not found" });
        }
        return res.status(200).json({
            success: true,
            prescription
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
});

// Update prescription
router.put('/prescription/update/:id', async (req, res) => {
    try {
        const updatedPrescription = await Prescriptions.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updatedPrescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }
        return res.status(200).json({
            success: "Prescription updated successfully",
            updatedPrescription
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Delete prescription
router.delete('/prescription/delete/:id', async (req, res) => {
    try {
        const deletedPrescription = await Prescriptions.findByIdAndDelete(req.params.id).exec();
        if (!deletedPrescription) {
            return res.status(404).json({ message: "Delete unsuccessful: Prescription not found" });
        }
        return res.json({ message: "Prescription deleted successfully", deletedPrescription });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;
