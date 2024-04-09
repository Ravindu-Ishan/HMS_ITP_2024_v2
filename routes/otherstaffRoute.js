const express = require('express');

const OtherStaff = require('../models/otherstaffModel');

const router = express.Router();

//route to create new other staff entry
router.post('/otherstaff/create', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.smid || !request.body.bid) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation

        const newotherstaff = {
            smid: request.body.smid,
            bid: request.body.bid
        };

        const otherstaffdata = await OtherStaff.create(newotherstaff);
        return response.status(201).send(otherstaffdata); //status 201 - request succeeded and resource created
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }
});


//route to get other staff details by smid
router.get('/otherstaff/get/:smid', async (request, response) => {
    try {

        const smid = request.params.smid;
        const data = await OtherStaff.findOne({ smid: smid });
        return response.status(200).json(data);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route for updating otherstaff details
router.put('/otherstaff/update/:smid', async (request, response) => {
    try {
        if (!request.body.bid) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //get parameter
        const smid = request.params.smid;
        const { bid } = request.body;

        //get result and save to result constant
        const result = await OtherStaff.findOneAndUpdate(
            {
                //filter from
                smid: smid
            },
            {
                //update
                bid: bid
            });
        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Other Staff Detail Not Found' });
        }

        return response.status(200).send(result);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;