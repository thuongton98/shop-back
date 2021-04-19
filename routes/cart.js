const router = require('express').Router();

let Cart = require('../model/cart-models');

router.route('/').get((req,res)=>{
    Cart.find()
       .then(carts=>res.json(carts))
       .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const userid=req.body.userid
    const tenshop = req.body.tenshop;
    const tensanpham = req.body.tensanpham;
    const loaisanpham = req.body.loaisanpham;
    const giasanpham = req.body.giasanpham;
    const loaishop = req.body.loaishop;

    const newCart = new Cart({
        userid,
        tenshop,
       tensanpham,
       loaisanpham,
       giasanpham,
       loaishop,
    });
    newCart.save()
      .then(()=>res.json('add to cart!'))
      .catch(err=>res.status(400).json('Error: '+err));
})



router.route('/:id').get((req,res)=>{
    Cart.findById(req.params.id)
      .then(cart=>res.json(cart))
      .catch(err=>res.status(400).json('Error: '+err));
})




module.exports = router;