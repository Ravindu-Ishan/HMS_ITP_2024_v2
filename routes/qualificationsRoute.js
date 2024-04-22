const express = require('express');
const Qualification = require('../models/qualificationsModel');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


//route to create new staff entry
router.post('/upload/qualification', upload.single('avatar'), async function (req, res, next) {












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