const{Router} = require('express')
const sellerController = require('../controllers/seller-controller')

const router = Router();

router.get('/', sellerController.getSellers);
router.get('/location', sellerController.getLocation);
router.get('/product/:id', sellerController.getProductCategoryDistribution);
router.get('/productDistribution/:id', sellerController.getProductCategoryDistribution);

module.exports = router;