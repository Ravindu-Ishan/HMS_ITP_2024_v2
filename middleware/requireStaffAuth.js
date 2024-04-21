const jwt = require('jsonwebtoken');
const account = require('../models/accountModel.js');
const { SECRET } = require('../globalData.js');


const requireStaffAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { smid, bid, role } = jwt.verify(token, SECRET)

        req.user = await account.findOne({ smid }).select('smid')
        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({ error: ' Request is not authorized' })
    }


}

module.exports = requireStaffAuth