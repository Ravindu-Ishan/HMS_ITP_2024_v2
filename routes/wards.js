const express = require('express');
const Wards = require('../models/wards');

const router = express.Router();

//save wards
router.post('/ward/save', async (req, res) => {
    try {
        let newWard = new Wards(req.body);
        await newWard.save();
        return res.status(200).json({
            success: "Ward saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//get wards
router.get('/wards', async (req, res) => {
    try {
        const wards = await Wards.find().exec();
        return res.status(200).json({
            success: true,
            existingWards: wards
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


//get a specific ward
router.get("/ward/:id",(req,res) => {
    let wardID = req.params.id;
    console.log("wardID:", wardID); // Log the wardID

    Wards.findById(wardID)
    .then(ward => {
        if (!ward) {
            return res.status(404).json({ success: false, error: "Ward not found." });
        }

        return res.status(200).json({
            success: true,
            ward
        });
    })
    .catch(err => {
        return res.status(400).json({ success: false, error: err.message });
    });
});



//update wards
router.put('/ward/update/:id', async (req, res) => {
    try {
        const wardID = req.params.id;
        const updatedWard = req.body;
        
        // Validate request body here if necessary

        const ward = await Wards.findByIdAndUpdate(wardID, { $set: updatedWard }, { new: true }).exec();
        if (!ward) {
            return res.status(404).json({ error: "Ward not found" });
        }

        return res.status(200).json({
            success: "Updated successfully",
            updatedWard: ward
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


//delete ward
router.delete('/ward/delete/:id', async (req, res) => {
    try {
        const deletedWard = await Wards.findByIdAndDelete(req.params.id).exec();
        if (!deletedWard) {
            return res.status(404).json({ message: "ward not found" });
        }
        return res.json({ message: "Delete successful", deletedWard });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

// Fetch available ward IDs
router.get('/ward-ids', async (req, res) => {
    try {
        // Query your database for the list of available ward IDs
        const wards = await Wards.find({ /* Add any necessary filters */ }).exec();

        // Extract the ward IDs from the retrieved ward records
        const wardIDs = wards.map(ward => ward.ward_ID);

        return res.status(200).json({
            success: true,
            wardIDs
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;