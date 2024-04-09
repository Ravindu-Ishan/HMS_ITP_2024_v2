const express = require('express');

const Doctor = require('../models/doctorModel');

const router = express.Router();


//route to create new doc entry
router.post('/doctordetail/create', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.smid || !request.body.specialisation) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation
        const data = {
            smid: request.body.smid,
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


//route to get doctor details by smid
router.get('/getDocDetails/:smid', async (request, response) => {
    try {

        const smid = request.params.smid;
        const details = await Doctor.findOne({ smid: smid });
        return response.status(200).json(details);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route for updating doc details
router.put('/updateDocDetail/:smid', async (request, response) => {
    try {

        if (!request.body.specialisation) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }

        //get parameter
        const smid = request.params.smid;
        const { specialisation } = request.body;

        //get result and save to result constant
        const result = await Doctor.findOneAndUpdate(
            {
                //filter from
                smid: smid
            },
            {
                //update
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