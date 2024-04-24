const mongoose = require('mongoose');

const labAppSchema = new mongoose.Schema({

    //Name
    pname:{
        type: String,
        required: true
    },

    //NIC
    nic:{
        type: String,
        required: true
    },

    //service
    service:{
        type: String,
        required: true
    },

    //status
    status:{
        type: String,
        required: true
    },   
   
    //ScheduleTime
    doctor:{
        type: String,
        required: true
    },

    //Age
    age:{
        type: String,
        required: true
    },

    //BirthDate
    dateOfBirth:{
        type: String,
        required: true
    },

    //Phone
    phone:{
        type: String,
        required: true
    },

});


module.exports = mongoose.model('LabApps', labAppSchema);