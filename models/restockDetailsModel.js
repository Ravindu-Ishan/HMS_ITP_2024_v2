const mongoose = require('mongoose');

const restockSchema = new mongoose.Schema ({
    
    ProductName:{
        type:String,
        required:true   
    },
    restockDate:{
        type:Date,
        required:true   
    },
    restockStatus:{
        type:String,
        required:true
    },
    restockQuantity:{
        type:String,
        required:true
    },
    restockSupplierID:{
        type:String,
        required:true
    },
    restockNotes:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('restock',restockSchema);