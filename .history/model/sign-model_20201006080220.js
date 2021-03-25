const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signSchema = new Schema({
    email:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    fname:{
        type:String,
        require:true,
    },
    lname:{
        type:String,
        require:true,
    },
    bird:{
        type:Number,
        require:true,
    },
    diachi:{
        type:String,
        require:true,
    },
    pass:{
        type:String,
        require:true,
    }
})


const Sign = mongoose.model('Sign',signSchema);

module.exports = sign;