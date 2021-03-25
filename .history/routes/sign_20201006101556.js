const router = require('express').Router();
const nodemailer = require("nodemailer");
const { userInfo } = require('os');
let User = require('../model/sign-model');
var crypto = require("crypto");
//show all user
router.route('/').get((req,res)=>{
    User.find()
       .then(users=>res.json(users))
       .catch(err=>res.status(400).json('Error: '+err))
})

//tao user
router.route('/add').post((req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const bird=req.body.bird;
    const diachi=req.body.diachi;
    const pass=req.body.pass;
    const token=crypto.randomBytes(200).toString('hex');
    const active='no';
    const img='http://localhost:5000/upload/defaultuser.png';

    const newUser = new User({
        email,
        username,
        fname,
        lname,
        bird,
        diachi,
        pass,
        token,
        active,
        img
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
        const link='http://localhost:5000/active/'+ok.token
        const t=`Click To Active`.link(link)
       
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: ok.email,
            subject: 'This is Thuong!!!!',
            
            html:'<b>This is Active</b> <br> <p>reset link on 1 hour</p> <br>'+t
        
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
        ok.token = crypto.randomBytes(200).toString('hex');
  
       ok.save();
       }, 3600000);
    }
    
    )
    .then((ok)=>res.json('ok'))
       
    .catch(err => res.status(400).json('Error: '+err));

})

router.route('/active/:id').post((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>{
        var crypto = require("crypto");
        if(user[0].active==='no'){
            user[0].active=req.body.active
            user[0].token = crypto.randomBytes(200).toString('hex');
      
           
            user[0].save()
            .then(()=>res.json('active'))
       .catch(err => res.status(400).json('Error: '+ err));
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

router.route('/updateimg/:id').post((req,res)=>{
    User.find({token:req.params.id})
        .then(user=>{
            user[0].img = req.body.img;
            
            user[0].save()
       .then(()=>res.json('user update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
router.route('/reset/:id').post((req,res)=>{
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
            const link='http://localhost:5000/resetpass/'+user[0].token
            const t=`Click To Reset`.link(link)
           
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Thuong',
                to: user[0].email,
                subject: 'This is Thuong!!!!',
                
                html:'<b>This is Reset Pass</b> <br> <p>reset link on 1 hour</p> <br>'+t
            
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
            user[0].token = crypto.randomBytes(200).toString('hex');
      
           user[0].save();
           }, 3600000);
       
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
router.route('/resetpass/:id').post((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>{
        var crypto = require("crypto");
            user[0].pass=req.body.pass
            
            user[0].token = crypto.randomBytes(200).toString('hex');
      
           
            user[0].save()
            .then(()=>res.json('active'))
       .catch(err => res.status(400).json('Error: '+ err));
        
    })
    .catch(err => res.status(400).json('Error: '+err));
})


module.exports = router;