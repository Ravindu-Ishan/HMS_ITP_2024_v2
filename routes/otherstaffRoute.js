const express = require('express');

const OtherStaff = require('../models/otherstaffModel');

const router = express.Router();

//route to create new other staff entry
router.post('/createOtherStaff', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.staff_NIC || !request.body.branchName) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation

        const newotherstaff = {
            staff_NIC: request.body.staff_NIC,
            branchName: request.body.branchName
        };

        const otherstaffdata = await OtherStaff.create(newotherstaff);
        return response.status(201).send(otherstaffdata); //status 201 - request succeeded and resource created
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }
});


//route to get other staff details by staff_NIC
router.get('/getOtherStaffDetails/:staffNIC', async (request, response) => {
    try {

        const staffNIC = request.params.staffNIC;
        const otherstaff = await OtherStaff.findOne({ staff_NIC: staffNIC });
        return response.status(200).json(otherstaff);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route for updating otherstaff details
router.put('/updateOtherStaff/:id', async (request, response) => {
    try {
        if (!request.body.branchName) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //get id
        const { id } = request.params;
        //get result and save to result constant
        const result = await OtherStaff.findByIdAndUpdate(id, request.body);

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Staff member not found' });
        }
        return response.status(200).send({ message: 'Staff information updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;