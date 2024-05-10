const express = require('express');
const Products = require('../models/productDetailsModel'); 
const router = express.Router();



// Save product
router.post('/product/save', async (req, res) => { 
    try {
        const newProduct = new Products(req.body); 
        await newProduct.save();
        res.status(200).json({ success: "Product saved successfully" });
    } catch (error) {
        return res.status(400).json({
            error: error 
        });
    }
});


// Get products
router.get("/products", async (req, res) => { 
    try {
        const products = await Products.find({});
        res.status(200).json({ success: true, existingProducts: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(400).json({ success: false, error: "Failed to fetch products" });
    }
});


//get a specific product
router.get("/product/:id", async (req, res) => { 
    try {
        let productId = req.params.id;
        const product = await Products.findById(productId).exec();
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
    
});

// Update products
router.put('/product/update/:id', async (req, res) => { 
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ success: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

// Delete product
router.delete('/product/delete/:id', async (req, res) => { 
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id).exec();
        if (!deletedProduct) {
            return res.status(404).json({ message: "Delete unsuccessful: Product not found" });
        }
        return res.json({ message: "Delete successful", deletedProduct });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

module.exports = router;