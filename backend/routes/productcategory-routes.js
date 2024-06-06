const { Router } = require('express');
const productController = require('../controllers/productcategory-controller');

const router = Router();

router.get('/', productController.getProductCategories);

module.exports = router;