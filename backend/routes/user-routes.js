const{Router} = require('express')
const userController = require('../controllers/user-controller')
const multer  = require('multer')
const path = require('path')
const router = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join('public/uploads/seller_images'));
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.post('/seller', upload.single('img'), userController.addSeller);
router.post('/login', userController.login);
router.post('/review', userController.createReview);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/address/:id', userController.getAddress);


module.exports = router;
