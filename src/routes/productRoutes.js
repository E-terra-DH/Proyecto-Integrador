const express = require('express');
const router = express.Router();
const path = require('path');

const productController = require('../controllers/productController');

router.get('/',productController.productList);
router.get('/detail',productController.productDetail);
router.get('/cart',productController.productCart);
//router.get('/list',productController.productList);
router.get('/formLoad',productController.formLoad);
router.get('/formEdit',productController.formEdit);

module.exports = router;