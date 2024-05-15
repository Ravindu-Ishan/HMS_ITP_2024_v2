const express = require('express');
const Laboratory = require('../models/laboratory');

const router = express.Router();

//save laboratory data
router.post('/laboratory/save', async (req, res) => {
    try {
        let newLabData = new Laboratory(req.body);
        await newLabData.save();
        return res.status(200).json({
            success: "Laboratory data saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//get laboratory data
router.get('/laboratory', async (req, res) => {
    try {
        const labData = await Laboratory.find().exec();
        return res.status(200).json({
            success: true,
            existingLabData: labData
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

//get a specific laboratory data
router.get("/laboratory/:id", (req, res) => {
    let labDataId = req.params.id;

    Laboratory.findById(labDataId)
        .then(data => {
            if (!data) {
                return res.status(404).json({ success: false, error: "Laboratory data not found." });
            }

            return res.status(200).json({
                success: true,
                data
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err.message });
        });
});


//update laboratory data
router.put('/laboratory/update/:id', async (req, res) => {
    try {
        const labDataId = req.params.id;
        const updatedLabData = req.body;

        const data = await Laboratory.findByIdAndUpdate(labDataId, { $set: updatedLabData }, { new: true }).exec();
        if (!data) {
            return res.status(404).json({ error: "Laboratory data not found" });
        }

        return res.status(200).json({
            success: "Updated successfully",
            updatedLabData: data
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

//delete laboratory data
router.delete('/laboratory/delete/:id', async (req, res) => {
    try {
        const deletedLabData = await Laboratory.findByIdAndDelete(req.params.id).exec();
        if (!deletedLabData) {
            return res.status(404).json({ message: "Laboratory data not found" });
        }
        return res.json({ message: "Delete successful", deletedLabData });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;
