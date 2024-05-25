const{Router} = require('express')
const productController = require('../controllers/product-controller')

const router = Router();

router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;
