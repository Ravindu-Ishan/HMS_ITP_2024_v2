const express = require('express');

const Branch = require('../models/branchModel');

const router = express.Router();

//route to create new branch
router.post('/branchcreate', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.branchName || !request.body.branchLocation) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation

        const newbranch = {
            branchName: request.body.branchName,
            branchLocation: request.body.branchLocation
        };

        const branchdata = await Branch.create(newbranch);
        return response.status(201).send(branchdata); //status 201 - request succeeded and resource created
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }
});

//route to get all branch entries
router.get('/branchget', async (request, response) => {
    try {
        const branches = await Branch.find({});
        return response.status(200).json(
            {
                count: branches.length,
                data: branches
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to get one branch member by branchName
router.get('/getbybname/:branchName', async (request, response) => {
    try {

        const branchname = request.params.branchName;
        const branch = await Branch.findOne({ branchName: branchname });
        return response.status(200).json(branch);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to get a branch by ID
router.get('/getBranchID/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const branch = await Branch.findById(id);
        return response.status(200).json(branch);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route for updating branch details
router.put('/updateBranch/:id', async (request, response) => {
    try {
        if (!request.body.branchName || !request.body.branchLocation) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //get id
        const { id } = request.params;
        //get result and save to result constant
        const result = await Branch.findByIdAndUpdate(id, request.body);

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Branch not found' });
        }
        return response.status(200).send({ message: 'Branch updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for deleting a branch - deleting a branch should delete the branch entry from the staff members aswell !
router.delete('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Branch.findByIdAndDelete(id);

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Branch not found' });
        }
        return response.status(200).send({ message: 'Branch deleted successfully' });

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;