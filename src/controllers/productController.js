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

     category: async (req, res) => {
          try {

               if (req.params.id == 1) {
                    let category = await Product.findAll({
                         where: { products_categories_id: 1 }
                    });
                    res.render('../views/products/vistaCategory.ejs', { category, title: 'Plantas' })

               } else if (req.params.id == 2) {
                    let category = await Product.findAll({
                         where: { products_categories_id: 2 }
                    });
                    res.render('../views/products/vistaCategory.ejs', { category, title: 'Macetas' })

               } else if (req.params.id == 3) {
                    let category = await Product.findAll({
                         where: { products_categories_id: 3 }
                    });
                    res.render('../views/products/vistaCategory.ejs', { category, title: 'Accesorios' })

               } else {
                    let category = await Product.findAll({
                         where: { products_categories_id: 4 }
                    });
                    res.render('../views/products/vistaCategory.ejs', { category, title: 'Sustratos' })
               }

          } catch (error) {
               res.json(error)
          }

     },
     /* -----------------------CON LA BASE DE DATOS DE JSON-------------------*/
     index: async (req, res) => {
          try {
               let plantasList = await Product.findAll();
               res.render('./products/productList', { plantasList })
          }
          catch (error) {
               res.json(error)
          }
     },

     productCatalogue: async (req, res) => {
          try {
               let plantasList = await Product.findAll({
                    attributes: ['id', 'name', 'description', 'price', 'stock', 'image'],

                    where: {
                         products_categories_id: 1
                    }

               })


               res.render('../views/products/productList', {
                    title: 'Catálogo de productos',
                    plantasList
               })
          }
          catch (error) {
               res.json(error)
          }
     },

     productDetail: async (req, res) => {
          try {
               let planta = await Product.findByPk(req.params.id)
               if (planta) {
                    res.render('./products/productDetail', { planta })

               } else { res.render('404') }


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
               "image": req.file ? req.file.filename : "staff.jpg",
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

     update: async (req, res) => {
          try {
               const product = await Product.findByPk(req.params.id);

               await Product.update(
                    {
                         name: req.body.name,
                         products_categories_id: req.body.categoria,
                         price: req.body.precio,
                         image: req.file ? req.file.filename : "staff.jpg",
                         description: req.body.description,
                         stock: req.body.cantidad,
                         disponible: req.body.disponible,

                    },

                    {
                         where: { id: req.params.id }
                    })
               // res.render('preuba de la imagen', image)
               return res.redirect('/products/' + req.params.id);
          } catch (error) {
               res.json(error);
          }
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