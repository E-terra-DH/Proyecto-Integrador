const express = require('express');
const router = express.Router();

const mainController = require('../controllers/controller');


router.get('/', mainController.index);
router.get('/register', mainController.register);
router.get('/productDetail', mainController.register);
//router.get('/', registerController.register);


module.exports = router;