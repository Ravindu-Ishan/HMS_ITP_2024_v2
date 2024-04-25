const express = require('express');
const Beds = require('../models/beds');

const router = express.Router();

//save beds
router.post('/bed/save', async (req, res) => {
    try {
        let newBed = new Beds(req.body);
        await newBed.save();
        return res.status(200).json({
            success: "Bed saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//get beds
router.get('/beds', async (req, res) => {
    try {
        const beds = await Beds.find().exec();
        return res.status(200).json({
            success: true,
            existingBeds: beds
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


//get a specific bed
router.get("/bed/:id",(req,res) => {
    let bedId = req.params.id;
    console.log("bedId:", bedId); // Log the bedId

    Beds.findById(bedId)
    .then(bed => {
        if (!bed) {
            return res.status(404).json({ success: false, error: "Bed not found." });
        }

        return res.status(200).json({
            success: true,
            bed
        });
    })
    .catch(err => {
        return res.status(400).json({ success: false, error: err.message });
    });
});



//update beds
router.put('/bed/update/:id', async (req, res) => {
    try {
        const bedId = req.params.id;
        const updatedBed = req.body;
        
        // Validate request body here if necessary

        const bed = await Beds.findByIdAndUpdate(bedId, { $set: updatedBed }, { new: true }).exec();
        if (!bed) {
            return res.status(404).json({ error: "Bed not found" });
        }

        return res.status(200).json({
            success: "Updated successfully",
            updatedBed: bed
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


//delete bed
router.delete('/bed/delete/:id', async (req, res) => {
    try {
        const deletedBed = await Beds.findByIdAndDelete(req.params.id).exec();
        if (!deletedBed) {
            return res.status(404).json({ message: "Bed not found" });
        }
        return res.json({ message: "Delete successful", deletedBed });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;