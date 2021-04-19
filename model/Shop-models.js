const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    tenshop:{
      type:String,
      required:true  
    },
    loaishop:{
        type:String,
        required:true
    },
   diachi:{
       type:String,
       required:true
   }
})

const shop = mongoose.model('shop',shopSchema);

module.exports = shop;