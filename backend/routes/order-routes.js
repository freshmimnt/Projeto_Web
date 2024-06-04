const{Router, application} = require('express')
const orderController = require('../controllers/orders-controller')

const router = Router();

router.get('/:id', orderController.getOrders);
router.post('/', orderController.addOrder);
router.post('/completed/:id', orderController.orderCompleted);

module.exports = router;
