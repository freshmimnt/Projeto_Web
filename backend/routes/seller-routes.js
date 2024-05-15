const{Router} = require('express')
const sellerController = require('../controllers/seller-controller')

const router = Router();

router.get('/', sellerController.getSellers);

module.exports = router;