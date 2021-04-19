const router = require('express').Router();

let Sanpham = require('../model/sanpham-models');

router.route('/').get((req,res)=>{
    Sanpham.find()
       .then(sanphams=>res.json(sanphams))
       .catch(err=>res.status(400).json('Error: '+err))
})

router.route('/add').post((req,res)=>{
    const userid=req.body.userid;
    const tenshop = req.body.tenshop;
    const loaisanpham = req.body.loaisanpham;
    const tensanpham = req.body.tensanpham;
    const giasanpham = req.body.giasanpham;
    const danhgia = req.body.danhgia;
    const magiamgia = req.body.magiamgia;
    const mausac = req.body.mausac;
    const kichco = req.body.kichco;
    const soluong = req.body.soluong;
    const img = req.body.img
    const newSanpham = new Sanpham({
        userid,
        img,
        tenshop,
        loaisanpham,
        tensanpham,
        giasanpham,
        danhgia,
        magiamgia,
       
        mausac,
        kichco,
        soluong
    });
    newSanpham.save()
    .then(()=>res.json('add new sanpham!'))
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/:id').get((req,res)=>{
    Sanpham.findById(req.params.id)
      .then(sanpham=>res.json(sanpham))
      .catch(err=>res.status(400).json('Error: '+err));
})
//update san pham
router.route('/update/:id').post((req,res)=>{
    Sanpham.find({userid:req.params.id})
        .then(sanpham=>{
           
            sanpham[0].tensanpham = req.body.edittensanpham;
            sanpham[0].loaisanpham= req.body.editloaisanpham;
            sanpham[0].giasanpham = req.body.editgiasanpham;
            sanpham[0].magiamgia = req.body.editmagiamgia;
            sanpham[0].mausac=req.body.editmausac;
            sanpham[0].kichco=req.body.editkichco;
            sanpham[0].soluong=req.body.editsoluong;
       
            sanpham[0].save()
            
       .then(()=>res.json('sanpham update!'))
       .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
})
//delete
router.route('/:id').delete((req,res)=>{
    Sanpham.findByIdAndDelete(req.params.id)
        .then(() =>res.json('sanpham deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;