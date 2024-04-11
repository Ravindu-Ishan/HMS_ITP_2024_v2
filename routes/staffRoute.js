const express = require('express');

const Staff = require('../models/staffModel');

const router = express.Router();

//route to create new staff entry
router.post('/create', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.staff_NIC || !request.body.staffName || !request.body.dateOfBirth || !request.body.role) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation

        const newStaffMember = {
            staff_NIC: request.body.staff_NIC,
            staffName: request.body.staffName,
            dateOfBirth: request.body.dateOfBirth,
            role: request.body.role,
        };

        const staffdata = await Staff.create(newStaffMember);
        return response.status(201).send(staffdata); //status 201 - request succeeded and resource created
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }
});

//route to get all staff entries
router.get('/get', async (request, response) => {
    try {
        const staffmembers = await Staff.find({});
        return response.status(200).json(
            {
                count: staffmembers.length,
                data: staffmembers
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to get one staff member by NIC
router.get('/nic/:staffNIC', async (request, response) => {
    try {

        const staffNIC = request.params.staffNIC;
        const staffmember = await Staff.findOne({ staff_NIC: staffNIC });
        return response.status(200).json(staffmember);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to get one staff member by id
router.get('/profile/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const member = await Staff.findById(id);
        return response.status(200).json(member);


    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//test route --> get staff entries where role = doctor
router.get('/testgetdocs/:role', async (request, response) => {
    try {

        const { role } = request.params;
        const staffmembers = await Staff.find({ role: role });
        return response.status(200).json(
            {
                count: staffmembers.length,
                data: staffmembers
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



//route for updating staff details
router.put('/update/:id', async (request, response) => {
    try {
        if (!request.body.staff_NIC || !request.body.staffName || !request.body.dateOfBirth || !request.body.role) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //get id
        const { id } = request.params;
        //get result and save to result constant
        const result = await Staff.findByIdAndUpdate(id, request.body);

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Staff member not found' });
        }
        return response.status(200).send({ message: 'Staff member updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for deleting a staff member
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Staff.findByIdAndDelete(id);

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Staff member not found' });
        }
        return response.status(200).send({ message: 'Staff member deleted successfully' });

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;