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
const User = db.User;
const ProductCategory = db.ProductCategory;


const productController =
{
     /* -----------------------CON LA BASE DE DATOS DE MySQL-------------------*/
     listaProductos: async (req, res) => {
          try {
               let products = await Product.findAll();
               // res.json({  products});
               res.render('../views/products/listaMysql', { products })
          }
          catch (error) {
               res.json(error)
          }
     },
     detalleMysql: async (req, res) => {
          try {
               let productsId = await Product.findByPk(req.params.id);
               //res.json(productsId)
               res.render('../views/products/mysqlDetail', { productsId })

          }
          catch (error) {
               res.json(error)

          }
     },
     editmysql: async (req, res) => {
          try {
               let productsId = await Product.findByPk(req.params.id);
               res.render('../views/products/editMysql', { productsId })
          }
          catch (error) {
               res.json(error)
          }
     },


     /* -----------------------CON LA BASE DE DATOS DE JSON-------------------*/
     index: async (req, res) => {
          try {
               let plantasList = await Product.findAll();
               res.render('./products/listaProducts', { plantasList })
          }
          catch (error) {
               res.json(error)
          }
     },
     
     productCatalogue: async (req, res) => {
          try {
               let plantasList = await Product.findAll();
               res.render('../views/products/productList', {
                    title: 'Catálogo de productos',
                    plantasList
               })
          }
          catch (error) {
               res.json(error)
          }    
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

     productDetail: async (req, res) => {
          try {
               let planta = await Product.findByPk(req.params.id)
               res.render('./products/productDetail', {planta})
          } catch (error) {
               res.json(error)
          }
     },

     create: (req, res) => {
          res.render('./products/formLoad', {
               title: 'Nueva planta'
          });
     },

     store: (req, res) => {
          let errors = validationResult(req);
          if (!errors.isEmpty()) { //si errors no viene vacío. Es decir, si sí hay errores de validación
               return res.render('./products/formLoad', { //copy paste de procesamiento create
                    title: 'Nueva planta',
                    mensajeDeError: errors.mapped(), //enviar errores a la vista como un objeto
                    oldBody: req.body
               });
          }

          let newPlanta = {
               //"id": Date.now(),
               "name": req.body.name || 'sin nombre',
               "description": req.body.descripcion,
               "price": req.body.precio || 'sin precio',
               "stock": req.body.cantidad || 'sin cantidad',
               "image": req.file.filename || 'sin imagen',
               "products_categories_id": req.body.categoria,
               "disonible": req.body.disponible
          }

          Product.create(newPlanta);

          res.redirect('./index');
     },

     edit: async (req, res) => {

          try {
               let product = await Product.findByPk(req.params.id)
               res.render('./products/formularioEdit', {
                    title: 'Editando plantas',
                    product
               }); 
          } catch (error) {
              res.json(error);
          }
     },
     
     update: (req, res) => {

          Product.update(
               {
                    "name": req.body.name,
                    "description": req.body.descripcion,
                    "price": req.body.precio,
                    "stock": req.body.cantidad,
                    "image": req.file.filename,
                    "products_categories_id": req.body.categoria,
                    "disonible": req.body.disponible
               }, {
                    where: {
                         id: req.params.id
                    }
               }
          )
          .then(()=> {
               res.redirect('/products/index')
          })
     },

     delete: async (req, res) => {

          try {
               let planta = await Product.findByPk(req.params.id)
               res.render('products/delete', {
                    title: 'Eliminando plantas',
                    planta
               }); 
          } catch (error) {
              res.json(error);
          }
     },

     destroy: (req, res) => {

          Product.destroy({
               where: {
                    id: req.params.id
               }
          })
          
          res.redirect('/products/index');
     },

     productCart: (req, res) => {
          res.render('./products/productCart');
     }

};


module.exports = productController;