const router=require('express').Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageUploader = multer({ dest: 'images/' }); // (**)

//single ten gi fronend ten do

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    console.log('fileName', fileName);
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        })
    }
    res.sendFile(path.resolve(`./images/${fileName}`));
})



module.exports = router;
