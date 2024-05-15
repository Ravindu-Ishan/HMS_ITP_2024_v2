const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({

    //Patient ID
    // patientId:{
    //     type:String,
    //     required:true

    // },

    //Date
    date:{
        type:Date,
        required:true
    },

    //Diagnosis
    diagnosis:{
        type:String,
        required:true
    },

    //Medications
    medications:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('Prescriptions',prescriptionSchema);