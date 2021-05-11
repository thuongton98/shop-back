const router = require('express').Router();

let Cart = require('../model/cart-models');

router.route('/').get((req,res)=>{
    Cart.find()
       .then(carts=>res.json(carts))
       .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const userid=req.body.userid;
    const img=req.body.img;
    const tenshop = req.body.tenshop;
    const tensanpham = req.body.tensanpham;
    const loaisanpham = req.body.loaisanpham;
    const giasanpham = req.body.giasanpham;
    
    const check=req.body.check;
    const soluong=req.body.soluong;
    const idsanpham=req.body.idsanpham;
    const mausac=req.body.mausac;
    const kichco=req.body.kichco;
    const magiamgia=req.body.magiamgia;
    Cart.find({userid:req.body.userid})

    .then(cart=>{
     
   if(cart.length<1){
    const newCart = new Cart({
      userid,
      img,
      tenshop,
     tensanpham,
     loaisanpham,
     giasanpham,
     mausac,
     kichco,
     check,
     soluong,
     idsanpham,
     magiamgia
  });
  newCart.save()
    .then(()=>res.json('add to cart!'))
    .catch(err=>res.status(400).json('Error: '+err));
   }else{
      const z= cart.filter(function(value){
        return ((value.idsanpham === req.body.sanpham)&&(value.kichco === req.body.kichco)&&(value.mausac===req.body.mausac)&&(value.check===req.body.check))
      })
   
    if(z.length>0){
    
     
      
      
      for(var i=0;i<z.length;i++){
        const vitri=cart.indexOf(z[i])
        cart[vitri].soluong=parseInt(cart[vitri].soluong)+parseInt(req.body.soluong)
        cart[vitri].save()
      }
   
      
    }else{
      const newCart = new Cart({
        userid,
        img,
        tenshop,
       tensanpham,
       loaisanpham,
       giasanpham,
       mausac,
       kichco,
       check,
       soluong,
       idsanpham,
       magiamgia
    });
    newCart.save()
      .then(()=>res.json('add to cart!'))
      .catch(err=>res.status(400).json('Error: '+err));
    }
   }
    
   
    
    })
   
})



router.route('/:id').get((req,res)=>{
    Cart.findById(req.params.id)
      .then(cart=>res.json(cart))
      .catch(err=>res.status(400).json('Error: '+err));
})


//delete
router.route('/:id').delete((req,res)=>{
  Cart.findByIdAndDelete(req.params.id)
      .then(() =>res.json(' deleted.'))
      .catch(err => res.status(400).json('Error: '+err));
})
//update to nguoi ban 
router.route('/xuly/:id').post((req,res)=>{
  

   Cart.findById(req.params.id)

      .then(cart=>{
        
        cart.check=req.body.check;
        cart.soluong=req.body.soluong;
        cart.save()
        .then(()=>res.json('update!'))
        .catch(err => res.status(400).json('Error: '+ err));
      
      })
      .catch(err => res.status(400).json('Error: '+ err));
})


router.route('/updateitemcart/:id').post((req,res)=>{
  

  Cart.findById(req.params.id)

     .then(cart=>{
     if(cart.userid===req.body.userid){
       cart.soluong=req.body.newsoluong
       cart.mausac=req.body.newmausac
       cart.kichco=req.body.newkichco
      
       cart.save()
     }
    
     
     })
     .catch(err => res.status(400).json('Error: '+ err));
})
router.route('/changemagiamgia/:id').post((req,res)=>{
  

  Cart.findById(req.params.id)

     .then(cart=>{
     if(cart.userid===req.body.userid){
       
       cart.magiamgia=req.body.newmagiamgia
      
       cart.save()
     }
    
     
     })
     .catch(err => res.status(400).json('Error: '+ err));
  
})
router.route('/buyitem/:id').post((req,res)=>{
  

  Cart.findById(req.params.id)

     .then(cart=>{
     if(cart.userid===req.body.userid){
       cart.soluong=req.body.newsoluong
       cart.mausac=req.body.newmausac
       cart.kichco=req.body.newkichco
      cart.check=req.body.check
       cart.save()
     }
    
     
     })
     .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/updatecheck/:id').post((req,res)=>{
  

  Cart.findById(req.params.id)

     .then(cart=>{
     if(cart.userid===req.body.userid){
       
       cart.check=req.body.newcheck
      
       cart.save()
     }
    
     
     })
     .catch(err => res.status(400).json('Error: '+ err));
  
})





module.exports = router;