const router = require('express').Router();

let User = require('../model/sign-model');


router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Error: '+err))
})
router.route('/add').post((req,res)=>{
   
    const email = req.body.email;
    const pass = req.body.pass;
    
  
   

    const newUser = new User({
        email,
        pass,
        
    });

    newUser.save()
       .then(()=>res.json('user added!'))
       .catch(err => res.status(400).json('Error: '+err));
});


module.exports = router;