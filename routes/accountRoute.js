const express = require('express');

//import models here
const Account = require('../models/accountModel');
const OtherStaff = require('../models/otherstaffModel');
const Staff = require('../models/staffModel');

// express router
const router = express.Router();

/*------------------------------------- LOGIN Backend-----------------------------------------*/
const JsonWebToken = require('jsonwebtoken');
const SECRET = 'medflowhmssecretkeyhellobrowser123'

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
router.get('/login', async (request, response) => {
    try {
        if (!request.body.username || !request.body.password) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }

        //get passed parameters and save to constants
        const username = request.body.username;
        const password = request.body.password;

        //run login function and get user data
        const user = await Account.login(username, password);
        const smid = user.smid;

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
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
router.put('account/updatepassword/:smid', async (request, response) => {
    try {
        if (!request.body.username || !request.body.email) {
            return response.status(400).send(
                {
                    message: 'Send all required fields',
                }
            );
        }
        const smid = request.params.smid;
        //get by NIC
        const account = await Account.findOne({ smid: smid });

        // Encrypt the password using the static method from the model
        const hashedPassword = await Account.encryptPassword(request.body.password);

        //update detais
        if (Account.validateEmail(request.body.email) == false) {
            return response.status(400).send(
                {
                    message: 'Email is invalid',
                }
            );
        }

        account.email = request.body.email;
        account.password = hashedPassword;
        await account.save();

        //return success msg
        return response.status(200).send({ message: 'Account updated successfully' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

module.exports = router;
