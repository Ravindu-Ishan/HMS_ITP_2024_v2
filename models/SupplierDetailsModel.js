const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema ({

    SupplierName:{
        type:String,
        required:true   
    },
    SupplierBrand:{
        type:String,
        required:true
    },
    SupplierLocation:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Supplier',SupplierSchema);