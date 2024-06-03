const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller-controller');


router.get('/location', sellerController.getLocation)

module.exports = router;
