const express = require('express');
const Posts = require('../models/ShiftsModel');
const router = express.Router();

// Save post
router.post('/shift/save', async (req, res) => { // Ensure the route is correctly defined
    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        res.status(200).json({ success: "Post saved successfully" });
    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
});


// Get posts
router.get('/shift', async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        res.status(200).json({ success: true, existingPosts: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(400).json({ success: false, error: "Failed to fetch posts" });
    }
});


//get a specific post
router.get('/shift/getbyID/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            post
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }

});

//test route --> get shift entries related to the relavent smid ( staff member id )

router.get('/shift/getonly/:smid', async (request, response) => {
    try {

        const { smid } = request.params;
        const shiftsOf = await Posts.find({ smid: smid });
        return response.status(200).json(
            {
                count: shiftsOf.length, // returns amount of total entries
                data: shiftsOf
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//update posts

router.put('/shift/update/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ success: "Updated Successfully" });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});


//delete post

router.delete('/shift/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id).exec();
        if (!deletedPost) {
            return res.status(404).json({ message: "Delete unsuccessful: Post not found" });
        }
        return res.json({ message: "Delete successful", deletedPost });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});


module.exports = router;
