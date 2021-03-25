const router = require('express').Router();

const User = require('../model')

router.route('/').get((req,res)=>{
    console.log('zzz')
})



module.exports = router;