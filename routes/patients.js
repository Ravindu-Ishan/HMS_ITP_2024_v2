const express = require('express');
const Patients = require('../models/patients');

const router = express.Router();

// Save patient details
router.post('/patient/save', async (req, res) => {
    try {
        let newPatient = new Patients(req.body);
        await newPatient.save();
        return res.status(200).json({
            success: "Patient's details saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

// Get all patient details
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patients.find().exec();
        return res.status(200).json({
            success: true,
            existingPatients: patients
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

// Get a specific patient detail
router.get("/patient/:id", async (req, res) => {
    let patientId = req.params.id;
    console.log("patientId:", patientId); // Log the patientId

    Patients.findById(patientId)
        .then(patient => {
            if (!patient) {
                return res.status(404).json({ success: false, error: "Patient not found"});
            }

            return res.status(200).json({
                success: true,
                patient
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err.message});
        });
});

// Update patient details
router.put('/patient/update/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const updatedPatient = req.body;
        
        // Validate request body here if necessary

        const patient = await Patients.findByIdAndUpdate(patientId, { $set: updatedPatient }, { new: true }).exec();
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        return res.status(200).json({
            success: "Patient's details updated successfully",
            updatedPatient: patient
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message  
        });
    }    
});

// Delete patient detail
router.delete('/patient/delete/:id', async (req, res) => {
    try {
        const deletedPatient = await Patients.findByIdAndDelete(req.params.id).exec();

        if (!deletedPatient) {
            return res.status(404).json({ message: "Delete unsuccessful: Patient not found" });
        }

        return res.json({ message: "Patient's details delete successful", deletedPatient: deletedPatient });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});

// Route to get all patient names
router.get('/patient-names', async (req, res) => {
    try {
      const patients = await Patients.find({}, 'description').exec(); // Only fetch the 'description' field
      res.json({ success: true, patientNames: patients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to fetch patient names' });
    }
  });

module.exports = router;







{/*const express = require('express');
const Posts = require('../models/posts');
const posts = require('../models/posts');

const router = express.Router();

//save posts

router.post('/post/save', async (req,res)=>{
    try{
        let newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
            success:"Patient's details saved successfully"
        });
    }catch (err) {
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
            error: err
        });
    }
});

//get a specific post

router.get("/post/:id", async (req, res) => {
    let postId = req.params.id;
    console.log("postId:", postId); //log the postId

    Posts.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ success: false, error: "Post not found"});
            }

            return res.status(200).json({
                success: true,
                post
            })
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err.message});
        });

});

//update posts 

router.put('/post/update/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = req.body;
        
        //Validate request body here if necessary

        const post = await Posts.findByIdAndUpdate(postId, { $set: updatedPost }, { new: true }).exec();
        if(!post) {
            return res.status(404).json({ error:"Post not found" });
        }

        return res.status(200).json({
            success: "Patient's details updated successfully",
            updatedPost: post
        });
    } catch (err) {
        return res.status(500).json({
          error:err.message  
        });
    }    

});

//delete post

router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id).exec();

        if (!deletedPost) {
            return res.status(404).json({ message: "Delete unsuccessful: Post not found" });
        }

        return res.json({message: " Patient's details delete successful", deletedPost: deletedPost });
    } catch (err) {
        return res.status(500).json({ message: "Delete unsuccessful", error: err.message });
    }
});


module.exports = router;*/}

