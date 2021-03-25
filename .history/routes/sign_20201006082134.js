const router = require('express').Router();

let User = require('../model/sign-model');


router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Error: '+err))
})
router.route('/add').post((req,res)=>{
    function textToBin(text) {
        return (
          Array
            .from(text)
            .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
            .map(bin => '0'.repeat(8 - bin.length) + bin )
            .join(' ')
        );
      }
    const email = req.body.email;
    const a = req.body.pass;
    
  var n = a.toString();
    const pass = textToBin(n);

    const newUser = new User({
        email,
        pass,
        
    });

    newUser.save()
       .then(()=>res.json('user added!'))
       .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const bird=req.body.bird;
    const diachi=req.body.diachi;
    const pass=req.body.pass;
    
    const User = User({
        email,
        username,
        fname,
        lname,
        bird,
        diachi,
        pass
    })
  
    User.save()
    .then(()=>res.json('user added!'))
    .catch(err => res.status(400).json('Error: '+err));

    console.log(Sign)
})

module.exports = router;