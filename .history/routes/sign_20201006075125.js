const router = require('express').Router();

router.route('/').get((req,res)=>{
    console.log('zzz')
})

app.get('/favicon.ico', function(req, res) { 
    res.sendStatus(204); 
});

module.exports = router;