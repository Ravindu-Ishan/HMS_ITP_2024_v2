const express = require('express');
const Qualification = require('../models/qualificationsModel');
const router = express.Router();

//route to create new qualification
router.post('/qualifications/upload', async (request, response) => {
    try {
        if (!request.body.id || !request.body.docName || !request.body.docDescription || !request.body.docPath || !request.body.fileNameSave) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }

        const newQualification = {
            smid: request.body.id,
            docName: request.body.docName,
            docDescription: request.body.docDescription,
            docPath: request.body.docPath,
            fileName: request.body.fileNameSave,
        };

        const qualificationdata = await Qualification.create(newQualification);
        return response.status(201).send(qualificationdata);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }

});

//route to get many qualifications of a user
router.get('/qualifications/get/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const qualifications = await Qualification.find({ smid: id });
        return response.status(200).json(
            {
                count: qualifications.length,
                data: qualifications
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for deleting a staff member
router.delete('/qualifications/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Qualification.findByIdAndDelete(id);

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Qualification not found' });
        }
        return response.status(200).send({ message: 'Qualification deleted successfully' });

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});




module.exports = router;