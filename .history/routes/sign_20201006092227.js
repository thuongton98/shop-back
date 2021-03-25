const router = require('express').Router();
const nodemailer = require("nodemailer");
const { userInfo } = require('os');
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
    const active='no'

    const newUser = new User({
        email,
        username,
        fname,
        lname,
        bird,
        diachi,
        pass,
        token,
        active
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
        //link active lam lai
        const link='http://localhost:5000/'+ok.token
       
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
  
       ok.save();
       }, 25000);
    }
    
    )
    .then((ok)=>res.json('ok'))
       
    .catch(err => res.status(400).json('Error: '+err));

})

router.route('/active/:id').get((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>{
        if(user.token==='no'){
            console.log('z')
        }
    })
    .catch(err => res.status(400).json('Error: '+err));
})
router.route('/:id').get((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>res.json(user))
    .catch(err => res.status(400).json('Error: '+err));
})


router.route('/update/:id').post((req,res)=>{
    User.find({token:req.params.id})
        .then(user=>{
            user[0].username = req.body.username;
            user[0].fname = req.body.fname;
            user[0].lname = req.body.fname;
            user[0].bird = req.body.bird;
            user[0].diachi=req.body.diachi;
            user[0].save()
       .then(()=>res.json('user update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
router.route('/linkreset/:id').post((req,res)=>{
    User.find({token:req.params.id})
        .then(user=>{
            var transporter =  nodemailer.createTransport({ // config mail server
                service: 'Gmail',
                auth: {
                    user: 'thuongton98@gmail.com',
                    pass: '30031998thuong'
                },
               
            });
            //link active lam lai
            const link='http://localhost:5000/'+ok.token
           
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
      
           ok.save();
           }, 25000);
           
           
       
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
router.route('/reset/:id').post((req,res)=>{
    User.find({token:req.params.id})
        .then(user=>{
            user[0].pass = req.body.pass;
           
            user[0].save()
       .then(()=>res.json('user update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})



module.exports = router;