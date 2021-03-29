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

//tao user check email
router.route('/add').post((req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const bird=req.body.bird;
    const diachi=req.body.diachi;
    const pass=req.body.pass;
    const type=req.body.type;
    const token=crypto.randomBytes(200).toString('hex');
    const active='no';
    //2 cai nay sua lai thanh req.body con ben font-end moi bo value
    const img='https://thuongton.net/api/user/images/default.jpg';
    const nguoidung='user'

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
        img,
        type,
        nguoidung
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
        const link='http://thuongton.net/active/'+ok.token
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
       },3600000);
    }
    
    )
    .then((ok)=>res.json('ok'))
       
    .catch(err => res.status(400).json('Error: '+err));

})
//active 
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
//show 1 user
router.route('/:id').get((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>res.json(user))
    .catch(err => res.status(400).json('Error: '+err));
})
//delete
router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(() =>res.json('user deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
})
//update admin all
router.route('/updateuser/:id').post((req,res)=>{
    User.find({token:req.params.id})
        .then(user=>{
            user[0].username = req.body.username;
            user[0].fname = req.body.fname;
            user[0].lname = req.body.fname;
            user[0].bird = req.body.bird;
            user[0].diachi=req.body.diachi;
            user[0].pass=req.body.pass;
            user[0].token=req.body.token;
            user[0].active=req.body.active;
            user[0].save()
       .then(()=>res.json('user update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
//update user not pass
router.route('/update/:id').post((req,res)=>{
    User.find({token:req.params.id})
        .then(user=>{
            user[0].username = req.body.username;
            user[0].fname = req.body.fname;
            user[0].lname = req.body.lname;
            user[0].bird = req.body.bird;
            user[0].diachi=req.body.diachi;
            user[0].type=req.body.type;
            user[0].save()
       .then(()=>res.json('user update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})

//update email send email
router.route('/update/email/:id').post((req,res)=>{
    
    User.find({token:req.params.id})
    .then(user=>{
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thuongton98@gmail.com',
                pass: '30031998thuong'
            },
           
        });
        const e=req.body.email;
   
        var j;
        var k=[];
        for(var i=0;i<e.length;i++){
          
           j=e[i]
            if(e[i]==='.'){
               j='_'
                
            }
          
                k.push(j)
               
           
          
           
        }
    const n=k.join('')

        //link active lam lai
        const link='http://thuongton.net/changeemail/'+n+'-'+user[0].token
        const t=`Click To Reset`.link(link)
       
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: req.body.email,
            subject: 'This is Thuong!!!!',
            
            html:'<b>This is Change Email </b> <br> <p>reset link on 1 hour</p> <br>'+t
        
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





//update email check
router.route('/update/email/check/:id').post((req,res)=>{
    
    User.find({token:req.params.id})
    .then(user=>{
        user[0].email = req.body.email;
     
        user[0].token = req.body.token;
        user[0].save()
   .then(()=>res.json('email update!'))
   .catch(err => res.status(400).json('Error: '+ err));
      
      
    
  
     
   
   
    })
    .catch(err => res.status(400).json('Error: '+ err));
})


//update pass -send email
router.route('/update/pass/:id').post((req,res)=>{
   
    User.find({token:req.params.id})
    .then(user=>{
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'gmail',
            auth: {
                user: 'thuongton98@gmail.com',
                pass: '30031998thuong'
            },
            
            host: "smtp.gmail.com",
           
        });
      
       user[0].newpass=req.body.newpass
user[0].save()


        //link active lam lai
        const link='http://thuongton.net/changepass/'+user[0].token
        const t=`Click To Reset`.link(link)
       
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: user[0].email,
            subject: 'This is Thuong!!!!',
            
            html:'<b>This is Change pass </b> <br> <p>reset link on 1 hour</p> <br>'+t
        
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
//update pass -check
router.route('/update/pass/check/:id').post((req,res)=>{
    
    User.find({token:req.params.id})
    .then(user=>{
        user[0].pass = req.body.newpass;
        user[0].newpass=''
        user[0].token = req.body.token;
        user[0].save()
   .then(()=>res.json('email update!'))
   .catch(err => res.status(400).json('Error: '+ err));
      
      
    
  
     
   
   
    })
    .catch(err => res.status(400).json('Error: '+ err));
})




//update img
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

//send email forget pass
router.route('/reset/:id').post((req,res)=>{
    User.find({email:req.params.id})
    .then(user=>{
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thuongton98@gmail.com',
                pass: '30031998thuong'
            },
           
        });
      const e = req.params.id
      var j;
        var k=[];
        for(var i=0;i<e.length;i++){
          
           j=e[i]
            if(e[i]==='.'){
               j='_'
                
            }
          
                k.push(j)
               
           
          
           
        }
    const n=k.join('')
      

        //link active lam lai
        const link='http://thuongton.net/changeforgetpass/'+n+'-'+user[0].token
        const t=`Click To Reset`.link(link)
       
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Thuong',
            to: req.params.id,
            subject: 'This is Thuong!!!!',
            
            html:'<b>This is Change Pass </b> <br> <p>reset link on 1 hour</p> <br>'+t
        
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
//forget pass
router.route('/resetpass/:id').post((req,res)=>{
    User.find({token:req.params.id})
    .then(user=>{
        var crypto = require("crypto");
            user[0].pass=req.body.pass
            
            user[0].token = req.body.token
      
           
            user[0].save()
            .then(()=>res.json('active'))
       .catch(err => res.status(400).json('Error: '+ err));
        
    })
    .catch(err => res.status(400).json('Error: '+err));
})


module.exports = router;