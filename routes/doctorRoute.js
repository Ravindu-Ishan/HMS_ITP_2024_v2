const express = require('express');

const Doctor = require('../models/doctorModel');

const router = express.Router();


//route to create new doc entry
router.post('/doctordetail/create', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.staffNIC || !request.body.specialisation) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation
        const data = {
            staff_NIC: request.body.staffNIC,
            specialisation: request.body.specialisation,
        };

        const docDetails = await Doctor.create(data);
        return response.status(201).send(docDetails); //status 201 - request succeeded and resource created
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }
});


//route to get doctor details by NIC
router.get('/getDocDetails/:staffNIC', async (request, response) => {
    try {

        const staffNIC = request.params.staffNIC;
        const details = await Doctor.findOne({ staff_NIC: staffNIC });
        return response.status(200).json(details);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route for updating doc details
router.put('/updateDocDetail/:staffNIC', async (request, response) => {
    try {

        if (!request.body.specialisation) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }

        //get parameter
        const staffNIC = request.params.staffNIC;
        const { specialisation } = request.body;

        //get result and save to result constant
        const result = await Doctor.findOneAndUpdate(
            {
                staff_NIC: staffNIC
            }, {
            specialisation: specialisation
        });
        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Detail Not Found' });
        }

        return response.status(200).send(result);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;