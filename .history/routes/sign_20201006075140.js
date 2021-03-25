const router = require('express').Router();

router.route('/').get((req,res)=>{
    console.log('zzz')
})

router.get('/favicon.ico', function(req, res) { 
    res.sendStatus(204); 
});

module.exports = router;