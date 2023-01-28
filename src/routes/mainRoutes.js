const express = require('express');
const router = express.Router();

const mainController = require('../controllers/controller');


router.get('/', mainController.index);
router.get('/register', mainController.register);
router.get('/login', mainController.login);
router.get('/productDetail', mainController.productDetail);
router.get('/productCart', mainController.productCart);



module.exports = router;