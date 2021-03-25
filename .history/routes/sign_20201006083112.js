const router = require('express').Router();

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
    .then(()=>res.json('user added!'))
    .catch(err => res.status(400).json('Error: '+err));

})

router.route('/:id').get((req,res)=>{
    User.find({token:req.params.id})
    .then
})


module.exports = router;