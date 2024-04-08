const express = require('express');
const Posts = require('../models/posts');


const router = express.Router();

//save posts
router.post('/post/save', async (req, res) => {
    try {
        let newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
            success: "Post saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//get posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


//get a specific post
router.get("/post/:id", (req, res) => {
    let postId = req.params.id;
    console.log("postId:", postId); // Log the postId

    Posts.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ success: false, error: "Post not found." });
            }

            return res.status(200).json({
                success: true,
                post
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err.message });
        });
});



//update posts
router.put('/post/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = req.body;

        // Validate request body here if necessary

        const post = await Posts.findByIdAndUpdate(postId, { $set: updatedPost }, { new: true }).exec();
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json({
            success: "Updated successfully",
            updatedPost: post
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});


//delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id).exec();
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json({ message: "Delete successful", deletedPost });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});


module.exports = router;