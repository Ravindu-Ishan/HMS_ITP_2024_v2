const mongoose = require('mongoose');

const otherstaffModel = mongoose.Schema(
    {
        smid: {
            type: String,
            unique: true,
            required: true,
        },
        bid: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('otherstaff', otherstaffModel);

//smid = staff member autogen id (object id)
//bid - branch autogenerated id (object id)