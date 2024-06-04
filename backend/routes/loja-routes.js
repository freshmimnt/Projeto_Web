const{Router} = require('express')
const lojaController = require('../controllers/loja-controller'); 

const router = Router();

router.post('/', lojaController.addCart);

module.exports = router;
