const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signSchema = new Schema({
    email:{
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
        type:Da,
        require:true,
    }
})