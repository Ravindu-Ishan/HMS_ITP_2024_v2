const express = require('express');
const Restocks = require('../models/restockDetailsModel'); //restockDetailsModel
const router = express.Router();

// Save restock
router.post('/restock/save', async (req, res) => { 
    try {
        const newRestock = new Restocks(req.body); 
        await newRestock.save();
        res.status(200).json({ success: "Restock saved successfully" });
    } catch (error) {
        return res.status(400).json({
            error: error 
        });
    }
});

// Get restocks
router.get("/restocks", async (req, res) => { 
    try {
        const restocks = await Restocks.find({});
        res.status(200).json({ success: true, existingRestocks: restocks });
    } catch (error) {
        console.error("Error fetching restocks:", error);
        res.status(400).json({ success: false, error: "Failed to fetch restocks" });
    }
});

// Get a specific restock
router.get("/restock/:id", async (req, res) => { 
    try {
        let restockId = req.params.id;
        const restock = await Restocks.findById(restockId).exec();
        
        if (!restock) {
            return res.status(404).json({ success: false, message: "Restock not found" });
        }

        return res.status(200).json({
            success: true,
            restock
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
});

// Update restocks
router.put('/restock/update/:id', async (req, res) => { 
    try {
        const restock = await Restocks.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!restock) {
            return res.status(404).json({ error: "Restock not found" });
        }
        return res.status(200).json({ success: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

// Delete restock
router.delete('/restock/delete/:id', async (req, res) => { 
    try {
        const deletedRestock = await Restocks.findByIdAndDelete(req.params.id).exec();
        if (!deletedRestock) {
            return res.status(404).json({ message: "Delete unsuccessful: Restock not found" });
        }
        return res.json({ message: "Delete successful", deletedRestock });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;