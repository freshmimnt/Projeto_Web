const{Router} = require('express')
const sellerCategoriesController = require('../controllers/sellercategory-controller')

const router = Router();

router.get('/all', sellerCategoriesController.getSellerCategories);

module.exports = router;