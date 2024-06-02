const{Router} = require('express')
const userController = require('../controllers/user-controller')

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.post('/seller', userController.addSeller);
router.post('/login', userController.login);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/address/:id', userController.getAddress);
router.post('/image/:id', userController.image);


module.exports = router;
