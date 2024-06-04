const{Router, application} = require('express')
const orderController = require('../controllers/orders-controller')

const router = Router();

router.get('/:id', orderController.getOrders);
router.post('/', orderController.addOrder);

module.exports = router;
