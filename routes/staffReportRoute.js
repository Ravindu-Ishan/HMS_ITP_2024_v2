const express = require('express');
const Staff = require('../models/staffModel');
const Doctor = require('../models/doctorModel')
const OtherStaff = require('../models/otherstaffModel')
const Account = require('../models/accountModel')
const router = express.Router();



//get total staff count
router.get('/getStaffCount', async (request, response) => {
    try {
        const staffmembers = await Staff.find({});
        return response.status(200).json(
            {
                count: staffmembers.length
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get doctorscount
// router.get('/getDoctorCount', async (request, response) => {
//     try {
//         const doctors = await Doctor.find({});
//         return response.status(200).json(
//             {
//                 count: doctors.length
//             }
//         );
//     }
//     catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

//get account count
router.get('/getAccountCount', async (request, response) => {
    try {
        const accounts = await Account.find({});
        return response.status(200).json(
            {
                count: accounts.length
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//get otherstaff count
router.get('/getOtherStaffCount', async (request, response) => {
    try {
        const otherStaff = await OtherStaff.find({});
        return response.status(200).json(
            {
                count: otherStaff.length
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get staff role counts
router.get('/getroleCount', async (request, response) => {
    try {
        const roleslist = await Staff.distinct('role')

        const counts = []

        if (roleslist != null) {
            // Loop through each distinct CategoryID
            for (const role of roleslist) {
                // Count the number of documents with the current CategoryID
                const count = await Staff.countDocuments({ role: role });

                // Push the count to the counts array
                counts.push({ Role: role, Count: count });
            }
        }

        return response.status(200).json(
            {
                data: counts
            }
        );
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


module.exports = router;