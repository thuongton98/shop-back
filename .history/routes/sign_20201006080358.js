const router = require('express').Router();

const User = require('../model/sign-model')

router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status)
})



module.exports = router;