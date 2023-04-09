const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const productsPath = path.join(__dirname, '../Data/products.json');
const dataBaseProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
const { validationResult } = require('express-validator'); // Aquí desestructuramos algo cuando es propio de un módulo.
const { name } = require('ejs');

//Llamado a modelos
// const {Product, ProductCategory} = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;
const Product = db.Product;
const ProductCategory = db.ProductCategory;


const productController = {

     //dataBaseProducts: () => { return JSON.parse(fs.readFileSync(productsPath, 'utf-8')); },// se crea aca para poder llamarla en metodos adelante   
     // dataBaseProducts: Product.findAll()
     // .then(products => {
     //      console.log(products)
     // }),
     index: (req, res) => {

          db.Product.findAll()
              .then(plantasList => {
               res.render('./products/listaProducts', {plantasList})
          })          
          // res.render('./products/listaProducts', {
          //      title: 'Listado de productos',
          //      plantasList: dataBaseProducts
          // });
     },

     productCatalogue: (req, res) => {

          res.render('../views/products/productList', {
               title: 'Catálogo de productos',
               plantasList: dataBaseProducts
          })
     },

     macetas: (req, res) => {

          res.render('./products/macetas', {
               title: 'Listado de accesorios',

          });
     },
     accesorios: (req, res) => {

          res.render('./products/accesorios', {
               title: 'Listado de accesorios',

          });
     },
     sustratos: (req, res) => {

          res.render('./products/sustratos', {
               title: 'Listado de sustratos',

          });
     },

     productDetail: (req, res) => {
          Product.findByPk(req.params.id)
          .then(planta => {
               res.render('./products/productDetail', {
                    planta})
          })

          // let plantaId = req.params.id;
		// let planta = productController.dataBaseProducts().find(planta => planta.id == plantaId);
		// res.render('./products/productDetail', {
		// 	planta});
	},

     create: (req, res) => {
          res.render('./products/formLoad', {
               title: 'Nueva planta'
          });
     },

     store: (req, res) => {
          let errors = validationResult(req);
          if (!errors.isEmpty()){ //si errors no viene vacío. Es decir, si sí hay errores de validación
               return res.render('./products/formLoad', { //copy paste de procesamiento create
                    title: 'Nueva planta',
                    mensajeDeError: errors.mapped(), //enviar errores a la vista como un objeto
                    oldBody: req.body
               });
          }

          let plantas = productController.dataBaseProducts();
          let image = req.file.filename;

          let newPlanta = {
               "id": Date.now(),
               "name": req.body.name || 'sin nombre',
               "descripcion": req.body.descripcion,
               "precio": req.body.precio || 'sin precio',
               "cantidad": req.body.cantidad || 'sin cantidad',
               "image": image || 'sin imagen',
               "categoria": req.body.categoria,
               "disonible": req.body.disponible
          }

          plantas.push(newPlanta);
          
          fs.writeFileSync(productsPath, JSON.stringify(plantas, null, ' '));

          res.redirect('./index');
     },

     edit: (req, res) => {
          let plantaId = req.params.id;
          let planta = productController.dataBaseProducts().find(planta => planta.id == plantaId);
          res.render('./products/formularioEdit', {
               title: 'Editando plantas',
               planta

          });
     },
     update: (req, res) => {
          let plantaId = req.params.id;
          let plantas = productController.dataBaseProducts();
          //let image = req.file.filename;// REPITO LO MISMO DE CREATE PARA SUBIR IMAGEN PERO LA PÁGINA SE ME ROMPE
          plantas.forEach((planta, i) => {
               if (planta.id == plantaId) {
                   planta.name = req.body.name;
                   planta.descripcion = req.body.descripcion;
                   planta.precio = req.body.precio;
                   planta.cantidad = req.body.cantidad;
                   //planta.image = image;// REPITO LO MISMO DE CREATE PARA SUBIR IMAGEN PERO LA PÁGINA SE ME ROMPE
                   planta.categoria = req.body.categoria;
                   planta.disponible = req.body.disponible;

                   plantas[i] = planta;
               }
          })
          fs.writeFileSync(productsPath,JSON.stringify(plantas,null,' '));

          res.redirect('/products/index')
         //console.log('verificando que llega desde el nagegador', plantas);

     },
     delete: (req, res) => {
          let plantaId = req.params.id;
          let planta = productController.dataBaseProducts().find(planta => planta.id == plantaId);

          res.render('products/delete', {
               title: 'Eliminando plantas',
               planta
          });

     },
     destroy: (req, res) => {
          let plantaId = req.params.id;
          let plantas = productController.dataBaseProducts();

          newPlantas = plantas.filter(planta => planta.id != plantaId);

          fs.writeFileSync(productsPath, JSON.stringify(newPlantas, null, ' '));

          res.redirect('/products/index');


     },

     // Son simples vistas 
     // productList: (req, res) => { // ESTA ES LA VISTA QUE TENEMOS EN EL CONTROLADOR DE INDEX
     //      res.render('./products/listaProducts');
     // },

     productCart: (req, res) => {
          res.render('./products/productCart');
     }

};


module.exports = productController;