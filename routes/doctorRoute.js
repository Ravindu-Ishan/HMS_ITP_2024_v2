const express = require('express');

const Staff = require('../models/doctorModel');

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