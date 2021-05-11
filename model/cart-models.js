const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    img:[],
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
    check:{
        type:String,
        required:true
    },
    soluong:{
        type:String,
        required:true
    },
    idsanpham:{
        type:String,
        required:true
    },
    mausac:{
        type:String,
        required:true
    },
    kichco:{
        type:String,
        required:true
    },
    magiamgia:{
        type:String,
        required:true
    }
   
})

const cart = mongoose.model('cart',cartSchema);

module.exports = cart;