const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    //Name
    topic:{
        type: String,
        required: false
    },

    //NIC
    description:{
        type: String,
        required: false
    },

    //Category
    postCategory:{
        type: String,
        required: false
    },

    //Doctor/Specialist
    doctor:{
        type: String,
        required: false
    },   
    
    //Status
    status:{
        type: String,
        required: false
    },

    //ScheduleDate
    dateSchedule:{
        type: String,
        required: false
    },

    //ScheduleTime
    timeSchedule:{
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
    appointId:{
        type: String,
        required: false
    }
});


module.exports = mongoose.model('Appointments', appointmentSchema);
