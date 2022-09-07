const express = require('express');
const router = express.Router();
const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
})
var upload = multer({ storage: storage })

router.post('/upload-single', upload.single('image'), function (req, res, next) {
  return res.json(req.file.filename)
})

module.exports = router;