const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    ward_type:{
        type:String,
        required:true
    },
    ward_ID:{
        type:String,
        required:true,
        unique: true // Enforce uniqueness on the ward_ID field
    },
    bed_count:{
        type:Number,
        required:true
    },
    special_requirements:{
        type:String
    },
    inventory_details:{
        type:String
    },
    doctor_specialist_ID:{
        type:String,
        required:true
    },
    doctor_specialist_name:{
        type:String,
        required:true
    },
    nurse_other_staff_ID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Wards',wardSchema);