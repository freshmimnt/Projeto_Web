const{Router} = require('express')
const productController = require('../controllers/product-controller')
const multer  = require('multer')
const path = require('path')

const router = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join('public/uploads/product_images'));
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('img'),productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;
