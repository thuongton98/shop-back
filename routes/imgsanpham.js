const router=require('express').Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageUploader = multer({ dest: 'imgsanpham/' }); // (**)

//single ten gi fronend ten do
router.post('/add', imageUploader.single('add'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    //trim bo khoang trong
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    res.send({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPath
    })
})

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    console.log('fileName', fileName);
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        })
    }
    res.sendFile(path.resolve(`./imgsanpham/${fileName}`));
})



module.exports = router;
