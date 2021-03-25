const router = require('express').Router();
const nodemailer = require("nodemailer");
let User = require('../model/sign-model');


router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Error: '+err))
})


router.route('/add').post((req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const bird=req.body.bird;
    const diachi=req.body.diachi;
    const pass=req.body.pass;
    const token=req.body.token;

    const newUser = new User({
        email,
        username,
        fname,
        lname,
        bird,
        diachi,
        pass,
        token
    })
  
    newUser.save()
    .then(ok=>{
        fs.readFile('index.html', {encoding: 'utf-8'}, function (err, html) {
            if (err) {
              console.log(err);
            } else {
                console.log("hello");
            }
          });
        
        });
       
       //settime doi sau khoan thoi gian
       setTimeout(()=>{
        var crypto = require("crypto");
        ok.token = crypto.randomBytes(20).toString('hex');
        ok.save()
       
       }, 360000);
    }
    
    )
    .then((ok)=>res.json('ok'))
       
    .catch(err => res.status(400).json('Error: '+err));

})

router.route('/:id').get((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>res.json(user))
    .catch(err => res.status(400).json('Error: '+err));
})


module.exports = router;