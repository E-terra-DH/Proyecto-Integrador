const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const productsPath = path.join(__dirname, '../data/products.json');
const dataBaseProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));




const productController = {
     /*getPlantas: () => {
          return JSON.parse(fs.readFileSync(plantasPath, 'utf-8'));
     },*/
     index: (req, res) => {

          res.render('./products/index', {
               title: 'Listado de productos',
               plantasList: dataBaseProducts
          });
     }
     ,
     productDetail: (req, res) => {
          res.render('./products/productDetail')
     },
     productCart: (req, res) => {
          res.render('./products/productCart');
     },
     create: (req, res) => {
          res.render('./products/formLoad');
     },
     store: (req, res) => {
          // TODO:crear la logica
     },
     edit: (req, res) => {

          res.render('./products/formularioEdit');
     },
     update: (req, res) => {


          //TODO:Implementar logica
     },


     productList: (req, res) => {
          res.render('./products/productList');
     },
     formLoad: (req, res) => {
          res.render('./formLoad');
     },
     formEdit: (req, res) => {
          res.render('./formularioEdit');
     }
};


module.exports = productController;