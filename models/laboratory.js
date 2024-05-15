const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema({
    patient_ID:{
        type:String,
        required:true
    },
    patient_name:{
        type:String,
        required:true
    },
    test_ID:{
        type:String,
        required:true
    },
    doctor_info:{
        type:String,
    },
    test_type:{
        type:String,
        required:true
    },
    test_description:{
        type:String,
        required:true
    },
    test_date:{
        type:Date,
        required:false
    },
    test_time:{
        type:Date,
        required:false
    },
});

module.exports = mongoose.model('laboratory',laboratorySchema);