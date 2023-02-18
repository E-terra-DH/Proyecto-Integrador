const express = require('express');
const router = express.Router();
const path = require('path');

const productController = require('../controllers/productController');



// Ruta a lista de products
router.get('/',productController.productList);

//Creando indice de productos disponibles
router.get('/index',productController.index);

// CREAR Productos usando el formulario
router.get('/create',productController.create);
router.post('/create',productController.store);

//Actualizar o crear productos
router.get('/edit', productController.edit );
router.put('/edit/:id', productController.update );// se usa para diferenciar cuando se actualiza


router.get('/cart',productController.productCart);
router.get('/detail',productController.productDetail);
router.get('/list',productController.productList);
router.get('/cart',productController.productCart);


// Rutas a crear







/*
// ver productos 
router.get('/:id', productsController.show);

//Eliminar productos
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy);//se usa para diferenciar cuando se elimina
*/




module.exports = router;