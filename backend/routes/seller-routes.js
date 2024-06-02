const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller-controller');
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/uploads/seller_images'));
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/register2/:userId', sellerController.getSellerRegistrationForm2);
router.post('/store', upload.single('img'), sellerController.addStore);
router.get('/location', sellerController.getLocation)

module.exports = router;
