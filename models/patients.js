const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    // NIC
    topic: {
        type: String,
        required: true
    },
    // Name
    description: {
        type: String,
        required: true
    },
    // Contact No
    postCategory: {
        type: String,
        required: true
    },
    // Age
    age: {
        type: String,
        required: true
    },
    // Past Medical History
    medicalhistory: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Patients', patientSchema);








{/*const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    //NIC
    topic:{
        type:String,
        required:true
    },

    //Name
    description:{
        type:String,
        required:true
    },

    //Contact No
    postCategory:{
        type:String,
        required:true
    },

    //Age
    age:{
        type:String,
        required:true
    },

    //Past Medical History
    medicalhistory:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Posts',postSchema);*/}