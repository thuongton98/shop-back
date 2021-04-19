const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    tenshop:{
      type:String,
      required:true  
    },
    tensanpham:{
        type:String,
        required:true
    },
    loaisanpham:{
        type:String,
        required:true
    },
    giasanpham:{
        type:String,
        required:true
    },
    loaishop:{
        type:String,
        required:true
    }
   
})

const cart = mongoose.model('cart',cartSchema);

module.exports = cart;