const router = require('express').Router();

let Shop = require('../model/Shop-models');

router.route('/').get((req,res)=>{
    Shop.find()
       .then(shops=>res.json(shops))
       .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const userid=req.body.userid;
    const tenshop = req.body.tenshop;
    const loaishop = req.body.loaishop;
    const diachi = req.body.diachi;
    const newShop = new Shop({
        userid,
        tenshop,
        loaishop,
        diachi
    });
    newShop.save()
      .then(()=>res.json('add new shop!'))
      .catch(err=>res.status(400).json('Error: '+err));
})



router.route('/:id').get((req,res)=>{
    Shop.findById(req.params.id)
      .then(shop=>res.json(shop))
      .catch(err=>res.status(400).json('Error: '+err));
})




module.exports = router;