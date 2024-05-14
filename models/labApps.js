const mongoose = require('mongoose');

const labAppSchema = new mongoose.Schema({

    //Name
    pname:{
        type: String,
        required: false
    },

    //NIC
    nic:{
        type: String,
        required: false
    },

    //service
    service:{
        type: String,
        required: false
    },

    //status
    status:{
        type: String,
        required: false
    },   
   
    //ScheduleTime
    doctor:{
        type: String,
        required: false
    },

    //Age
    age:{
        type: String,
        required: false
    },

    //BirthDate
    dateOfBirth:{
        type: String,
        required: false
    },

    //Phone
    phone:{
        type: String,
        required: false
    },

    //Appointment ID
    labAppId:{
        type: String,
        required: false
    },
});


module.exports = mongoose.model('LabApps', labAppSchema);