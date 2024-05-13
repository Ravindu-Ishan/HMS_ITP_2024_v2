const express = require('express');
const LabApps = require('../models/labApps');

const router = express.Router();

//save posts

router.post('/labApp/save', async(req,res) => {
    try {
        let newLabApp = new LabApps(req.body);
        await newLabApp.save();
        return res.status(200).json({
          success: "Posts saved successfully"
        });
      } catch (err) {
        return res.status(400).json({
          error: err
        });
      }
    // let newPost = new Posts(req.body);

    // newPost.save((err) => {
    //     if(err){
    //         return res.status(400).json({
    //             error: err
    //         });
    //     }
    //     return res.status(200).json({
    //         success: "Posts saved successfully"
    //     });
           
    // });

});

// get posts

router.get('/labApps', async(req, res) => {

    try {
        const labApps = await LabApps.find().exec();
        res.status(200).json({ success: true, existingLabApps: labApps});
    } catch (error) {
        console.error('Error in /posts route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    // Posts.find().exec((err, posts) =>{
    //     if(err){
    //         return res.status(400).json({
    //             error: err
    //         });
    //     }

    //     return res.status(200).json({
    //         success: true,
    //         existingPosts: posts
    //     });
    // });
});

//get a specific post

router.get("/labApp/:id",(req,res) => {
    let labAppId = req.params.id;

    LabApps.findById(labAppId)
    .then(labApp => {
        if (!labApp) {
            return res.status(404).json({ success: false, error: "Post not found." });
        }

        return res.status(200).json({
            success: true,
            labApp
        });
    })
    .catch(err => {
        return res.status(400).json({ success: false, error: err.message });
    });


    // Posts.findById(postId,(err, post) => {
    //     if(err){
    //         return res.status(400).json({success:false, err});

    //     }

    //     return res.status(200).json({
    //         success:true,
    //         post
    //     });
    // });

});




// update posts

router.put('/labApp/update/:id', async(req,res) => {

    try {
        const updatedLabApp = await LabApps.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Returns the modified document
        );

        if (!updatedLabApp) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json({
            success: 'Update Successfully',
            updatedLabApp
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    // Posts.findByIdAndUpdate(
    //     req.params.id,
    //     {
    //         // to update whole body
    //         $set:req.body
    //     },
    //     (err,post) => {
    //         if(err){
    //             return res.status(400).json({error:err});
    //         }

    //         return res.status(200).json({
    //             success: "Update Successfully"
    //         });
    //     }
    // );
});

// delete post

router.delete('/labApp/delete/:id', async(req,res) => {

    try {
        const deletedLabApp = await LabApps.findByIdAndDelete(req.params.id);

        if (!deletedLabApp) {
            return res.status(404).json({
                message: "Post not found for deletion"
            });
        }

        return res.status(200).json({
            message: "Delete Successful",
            deletedLabApp
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }

    // Posts.findByIdAndDelete(req.params.id).exec((err,deletedPost) => {
        
    //     if(err) return res.status(400).json({
    //         message:"Delete Unsuccessfull", err
    //     });

    //     return res.json({
    //         message:"Delete Successfull", deletedPost
    //     });
    // });
});

module.exports = router;