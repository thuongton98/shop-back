const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sanphamSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    img:{
        type:Array,
    },
    tenshop:{
      type:String,
      required:true  
    },
    loaisanpham:{
        type:String,
        required:true
    },
    tensanpham:{
        type:String,
        required:true
    },
    giasanpham:{
        type:String,
        required:true
    },
    danhgia:{
        type:String,
        required:true
    },
    magiamgia:{
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
    soluong:{
        type:Number,
        required:true
    }
})

const sanpham = mongoose.model('sanpham',sanphamSchema)

module.exports = sanpham;