const{Router} = require('express')
const userController = require('../controllers/user-controller')

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);

module.exports = router;