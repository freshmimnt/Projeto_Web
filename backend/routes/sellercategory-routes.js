const{Router} = require('express')
const sellerCategoriesController = require('../controllers/sellercategory-controller')

const router = Router();

router.get('/', sellerCategoriesController.getSellerCategories);

module.exports = router;