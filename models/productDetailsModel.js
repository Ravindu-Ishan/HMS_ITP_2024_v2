const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({

    ProductName:{
        type:String,
        required:true   
    },
    ExpireDate:{
        type:String,
        required:true
    },
    ManufactureDate:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    SupplierID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Products',productSchema);