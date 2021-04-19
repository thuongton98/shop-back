const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
var path = require('path')

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5001;

var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
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
app.use('/sign',sign)
const upload = require('./routes/upload')
app.use('/images',upload)
const shopRoute = require('./routes/shop')
app.use('/shop',shopRoute)
const sanphamRoute = require('./routes/sanpham')
app.use('/sanpham',sanphamRoute)
const cartRoute = require('./routes/cart')
app.use('/cart',cartRoute)
const Uploadimgsanpham = require('./routes/imgsanpham')
app.use('/imgsanpham',Uploadimgsanpham)


app.listen(port,()=>{
    console.log(`server connect on port: ${port}`)
})