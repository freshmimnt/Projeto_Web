const{Router} = require('express')
const sellerController = require('../controllers/seller-controller')

const router = Router();

router.get('/', sellerController.getSellers);
router.get('/location', sellerController.getLocation);

module.exports = router;