const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signSchema = new Schema({
    email:{
        type:String,
        require:true
    }
})