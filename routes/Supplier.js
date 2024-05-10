const express = require('express');
const Suppliers = require('../models/SupplierDetailsModel');
const router = express.Router();

// Save post
router.post('/Supplier/save', async (req, res) => { // Ensure the route is correctly defined
    try {
        const newSupplier = new Suppliers(req.body);
        await newSupplier.save();
        res.status(200).json({ success: "Suppliers saved successfully" });
    } catch (error) {
        return res.status(400).json({
            error: error 
        });
    }
});


// Get posts
router.get("/getSupplier", async (req, res) => {
    try {
        const suppliers = await Suppliers.find({});
        res.status(200).json({ success: true, existingSuppliers: suppliers });
    } catch (error) {
        console.error("Error fetching Suppliers:", error);
        res.status(400).json({ success: false, error: "Failed to fetch Suppliers" });
    }
});


//get a specific post
router.get("/Supplier/:id", async (req, res) => {
    try {
        let SupplierId = req.params.id;
        const supplier = await Suppliers.findById(SupplierId).exec();
        
        if (!supplier) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        return res.status(200).json({
            success: true,
            supplier
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
    
});





//update posts

router.put('/Supplier/update/:id', async (req, res) => {
    try {
        const post = await Suppliers.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        if (!post) {
            return res.status(404).json({ error: "Supplier not found" });
        }
        return res.status(200).json({ success: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});







//delete post

router.delete('/Supplier/delete/:id', async (req, res) => {
    try {
        const deletedSupplier = await Suppliers.findByIdAndDelete(req.params.id).exec();
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Delete unsuccessful: Post not found" });
        }
        return res.json({ message: "Delete successful", deletedSupplier});
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});


module.exports = router;
