const express = require('express');

//import models here
const Account = require('../models/accountModel');
const OtherStaff = require('../models/otherstaffModel');
const Staff = require('../models/staffModel');
const globalData = require('../globalData.js');

// express router
const router = express.Router();

/*------------------------------------- LOGIN Backend-----------------------------------------*/
const JsonWebToken = require('jsonwebtoken');
const { SECRET } = require('../globalData.js');

//create token for login
const createToken = (smid, bid, role) => {
    return JsonWebToken.sign(
        {
            smid: smid,
            bid: bid,
            role: role
        }, SECRET, { expiresIn: '1d' })
}

//route to login
router.post('/login', async (request, response) => {
    try {

        //get passed parameters and save to constants
        const username = request.body.username;
        const password = request.body.password;

        //run login function and get user data
        const user = await Account.login(username, password);
        const smid = user.smid;

        if (user != null) {
            const queryBid = await OtherStaff.findOne({ smid: smid });

            let bid;

            if (!queryBid) {
                bid = "none";
            }
            else {
                bid = queryBid.bid;
            }

            const queryRole = await Staff.findOne({ _id: smid });

            let role;

            if (queryRole) {
                role = queryRole.role;
            }

            const token = createToken(smid, bid, role);

            return response.status(201).json(token);
        }


    }
    catch (error) {
        console.log(error.message);
        response.status(200).send({ message: error.message });
    }
});

/*-------------------------------------End of LOGIN Backend-----------------------------------------*/

//route to create a new account
router.post('/account/create', async (request, response) => {
    try {
        //check if all data is being sent
        if (!request.body.smid || !request.body.username || !request.body.password || !request.body.email) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        //if pass validation
        const smid = request.body.smid;
        const username = request.body.username;
        const email = request.body.email;
        const password = request.body.password;

        const useraccount = await Account.signup(smid, email, username, password);
        return response.status(201).send(useraccount); //status 201 - request succeeded and resource created
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); //status 500 - generic error response
    }
});


//route to get an account entry by smid
router.get('/account/get/:smid', async (request, response) => {
    try {

        const smid = request.params.smid;
        const accdetails = await Account.findOne({ smid: smid });
        return response.status(200).json(accdetails);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.get('/account/available/:smid', async (request, response) => {
    try {

        const smid = request.params.smid;
        const accdetails = await Account.findOne({ smid: smid });

        if (accdetails) {
            return response.send(true);
        }
        else {
            return response.send(false);
        }
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route to update account details
router.put('/account/update/:smid', async (request, response) => {
    try {
        if (!request.body.username || !request.body.email) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        const smid = request.params.smid;
        const username = request.body.username;
        const email = request.body.email;


        const account = await Account.findOne({ smid: smid });
        account.email = email;
        account.username = username;
        await account.save();



        //return success msg
        return response.status(200).send({ message: 'Account updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//route to update password only
router.put('/account/updatepassword/:id', async (request, response) => {
    try {
        if (!request.body.newPassword) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        const smid = request.params.id;

        //get by NIC
        const account = await Account.findOne({ smid: smid });

        // Encrypt the password using the static method from the model
        const hashedPassword = await Account.encryptPassword(request.body.newPassword);

        account.password = hashedPassword;
        await account.save();

        //return success msg
        return response.status(200).send({ message: 'Password updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for deleting a branch - deleting a branch should delete the branch entry from the staff members aswell !
router.delete('/account/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Account.deleteOne({ smid: id });

        //if result is null
        if (!result) {
            return response.status(404).json({ message: 'Account not found' });
        }
        return response.status(200).send({ message: 'Account deleted successfully' });

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/account/password/compare/:id', async (request, response) => {

    try {
        if (!request.body.previousPassword) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }

        const previousPassword = request.body.previousPassword;
        const { id } = request.params;
        const comparePassword = await Account.compare(id, previousPassword);

        return response.status(200).send(comparePassword); //returns boolean value true or false

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;
