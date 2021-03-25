const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
var path = require('path')

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());


const db = require('./config/key').mongoURI;

mongoose
  .connect(
      db,
      {
          useNewUrlParser:true,
          useCreateIndex:true,
          useUnifiedTopology:true,
          useFindAndModify:false
      }
  )
  .then(()=>console.log('MonggoDB Connected'))
  .catch(err=>console.log(err));

const sign = require('./routes/sign')
app.use('/',sign)
const upload = require()

app.listen(port,()=>{
    console.log(`server connect on port: ${port}`)
})