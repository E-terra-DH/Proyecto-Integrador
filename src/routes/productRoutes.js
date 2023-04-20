const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multer');
const validateProductInfo = require('../middlewares/validationsProducts');

const productController = require('../controllers/productController');

// Ruta a lista de products
// router.get('/', productController.productList); //ESTE LO COMENTÉ PORQUE REALMENTE LO ESTAMOS HACIENDO EN EL INDEX

//Creando indice de productos disponibles en la base de datos MySQL
router.get('/mysqlProducts',productController.listaProductos);
router.get('/mysqlDetail/:id',productController.detalleMysql);
router.get('/editmysql/:id',productController.editmysql);

// Macetas, Accesorios y Sutratos
router.get('/macetas', productController.macetas);
router.get('/accesorios', productController.accesorios);
router.get('/sustratos', productController.sustratos);

/*-----------------------------------------------------------------------------*/

//Creando indice de productos disponibles en la base de datos JSON
router.get('/index', productController.productCatalogue);
router.get('/list', productController.index);


// CREAR Productos usando el formulario
router.get('/create', productController.create);
router.post('/create', upload.single('image'), validateProductInfo, productController.store);

//Editar productos desde el id y la vista de listado 
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', upload.single('image'), validateProductInfo, productController.update);// se usa para diferenciar cuando se actualiza

//Eliminando productos 
router.get('/delete/:id', productController.delete);
router.delete('/delete/:id', productController.destroy);


router.get('/cart', productController.productCart);
router.get('/:id', productController.productDetail); //PÁGINA DE DETALLE DE PRODUCTO
router.get('/cart', productController.productCart);


// Rutas a crear







/*
// ver productos 
router.get('/:id', productsController.show);

//Eliminar productos
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy);//se usa para diferenciar cuando se elimina
*/




module.exports = router;