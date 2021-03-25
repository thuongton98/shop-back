const router = require('express').Router();

const User = require('../model/sign-model')

router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const fname=req.body.email;
})

module.exports = router;