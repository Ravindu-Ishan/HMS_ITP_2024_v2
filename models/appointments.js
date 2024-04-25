const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    //Name
    topic:{
        type: String,
        required: true
    },

    //NIC
    description:{
        type: String,
        required: true
    },

    //Category
    postCategory:{
        type: String,
        required: true
    },

    //Doctor/Specialist
    doctor:{
        type: String,
        required: true
    },   
    
    //Status
    status:{
        type: String,
        required: true
    },

    //ScheduleDate
    dateSchedule:{
        type: String,
        required: true
    },

    //ScheduleTime
    timeSchedule:{
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
    }
});


module.exports = mongoose.model('Appointments', appointmentSchema);
