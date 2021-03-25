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
    .then(ok=>{
  
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thuongton98@gmail.com',
                pass: '30031998thuong'
            },
           
        });
        const link='https:///'+ok.token
       
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: ok.email,
            subject: 'This is Thuong!!!!',
            
            html:`Click To Active`.link(link),
        
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
               
            } else {
                console.log('Message sent: ' +  info.response);
               
            }
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