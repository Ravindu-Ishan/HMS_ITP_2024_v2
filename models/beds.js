const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    patient_ID:{
        type:String,
        required:true
    },
    patient_name:{
        type:String,
        required:true
    },
    ward_ID:{
        type:String,
        required:true
    },
    bed_ID:{
        type:String,
        required:true,
        unique: true // Enforce uniqueness on the bed_ID field
    },
    bed_location:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Beds',bedSchema);