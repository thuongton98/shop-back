const router = require('express').Router();

const User = require('../model/sign-model')

router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=)

module.exports = router;