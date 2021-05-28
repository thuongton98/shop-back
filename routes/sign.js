const router = require('express').Router();
const nodemailer = require("nodemailer");
const { userInfo } = require('os');
let User = require('../model/sign-model');
var crypto = require("crypto");
var fs = require('fs');


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
    var token;
    if(req.body.token===undefined){
        token=crypto.randomBytes(200).toString('hex');
    }else{
        token=req.body.token
    }
    var social;
    if(req.body.social===undefined){
        social='no'
    }else{
        social=req.body.social
    }
    const active='no';
    //2 cai nay sua lai thanh req.body con ben font-end moi bo value
    var img;
    if(req.body.img===undefined){
        img='https://thuongton.net/api/user/images/default.jpg';
    }else{
        img=req.body.img
    }
    const nguoidung=req.body.nguoidung;

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
        nguoidung,
        social,
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
        const link='https://thuongton.net/active/'+ok.token
       
        fs.readFile('./views/emailchangepass.html', {encoding: 'utf-8'}, function (err, html) {
        
            if (err) {
              console.log(err);
            } else {
                
                var n = html.replace("https://viewstripo.email/", "http://thuongton.net/");
                
             for(var i=0;i<10;i++){
                 if(n.includes("https://viewstripo.email/")===true){
                    n = n.replace("https://viewstripo.email/", "http://thuongton.net/");
                 }
             }
             n = n.replace("https://confirm/", link);
             var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: ok.email,
              subject: 'This is Thuong!!!!',
              
              html:n,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
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
            user[0].lname = req.body.lname;
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

    var transporter =  nodemailer.createTransport({ // config mail server
      service: 'Gmail',
      auth: {
          user: 'thuongton98@gmail.com',
          pass: '30031998thuong'
      },
     
  });
        //link active lam lai
        const link='https://thuongton.net/changeemail/'+n+'-'+user[0].token
        
       
       
fs.readFile('./views/emailchangepass.html', {encoding: 'utf-8'}, function (err, html) {

    if (err) {
      console.log(err);
    } else {
        
        var n = html.replace("https://viewstripo.email/", "http://thuongton.net/");
        
     for(var i=0;i<10;i++){
         if(n.includes("https://viewstripo.email/")===true){
            n = n.replace("https://viewstripo.email/", "http://thuongton.net/");
         }
     }
     n = n.replace("https://confirm/", link);
     var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
      from: 'Thuong',
      to: e,
      subject: 'This is Thuong!!!!',
      
      html:n,
  
  }
  transporter.sendMail(mainOptions, function(err, info){
      if (err) {
          console.log(err);
         
      } else {
          console.log('Message sent: ' +  info.response);
         
      }
  });
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
        service: 'Gmail',
        auth: {
            user: 'thuongton98@gmail.com',
            pass: '30031998thuong'
        },
       
    });
      var e = req.body.email
      console.log(e)
       user[0].newpass=req.body.newpass
user[0].save()


        //link active lam lai
        const link='https://thuongton.net/changepass/'+user[0].token
        
    

     
fs.readFile('./views/emailchangepass.html', {encoding: 'utf-8'}, function (err, html) {

    if (err) {
      console.log(err);
    } else {
        
        var n = html.replace("https://viewstripo.email/", "http://thuongton.net/");
        
     for(var i=0;i<10;i++){
         if(n.includes("https://viewstripo.email/")===true){
            n = n.replace("https://viewstripo.email/", "http://thuongton.net/");
         }
     }
     n = n.replace("https://confirm/", link);
     var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
      from: 'Thuong',
      to: e,
      subject: 'This is Thuong!!!!',
      
      html:n,
  
  }
  transporter.sendMail(mainOptions, function(err, info){
      if (err) {
          console.log(err);
         
      } else {
          console.log('Message sent: ' +  info.response);
         
      }
  });
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

//active 
router.route('/active/:id').post((req,res)=>{
    
  User.find({token:req.params.id})
  .then(user=>{
      user[0].active = req.body.active;
    
      user[0].token = req.body.token;
      user[0].save()
 .then(()=>res.json('account acttiive!'))
 .catch(err => res.status(400).json('Error: '+ err));
    
      //settime doi sau khoan thoi gian
      setTimeout(()=>{
        var crypto = require("crypto");
        user[0].token = crypto.randomBytes(200).toString('hex');
  
       user[0].save();
       }, 3600000);
   
  

   
 
 
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
      
    var transporter =  nodemailer.createTransport({ // config mail server
      service: 'Gmail',
      auth: {
          user: 'thuongton98@gmail.com',
          pass: '30031998thuong'
      },
     
  });
        //link active lam lai
        const link='https://thuongton.net/changeforgetpass/'+n+'-'+user[0].token
      
        fs.readFile('./views/emailchangepass.html', {encoding: 'utf-8'}, function (err, html) {
        
            if (err) {
              console.log(err);
            } else {
               
                var n = html.replace("https://viewstripo.email/", "http://thuongton.net/");
                
             for(var i=0;i<10;i++){
                 if(n.includes("https://viewstripo.email/")===true){
                    n = n.replace("https://viewstripo.email/", "http://thuongton.net/");
                 }
             }
             n = n.replace("https://confirm/", link);
             var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'Thuong',
              to: e,
              subject: 'This is Thuong!!!!',
              
              html:n,
          
          }
          transporter.sendMail(mainOptions, function(err, info){
              if (err) {
                  console.log(err);
                 
              } else {
                  console.log('Message sent: ' +  info.response);
                 
              }
          });
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
