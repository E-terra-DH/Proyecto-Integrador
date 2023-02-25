const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const productsPath = path.join(__dirname, '../Data/products.json');
const dataBaseProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));


const productController = {
     dataBaseProducts: () => { return JSON.parse(fs.readFileSync(productsPath, 'utf-8')); },// se crea aca para poder llamarla en metodos adelante
     index: (req, res) => {

          res.render('./products/listaProducts', {
               title: 'Listado de productos',
               plantasList: dataBaseProducts
          });
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
          res.render('./products/productDetail')
     },

     create: (req, res) => {
          res.render('./products/formLoad', {
               title: 'Nueva planta'
          });
     },
     store: (req, res) => {
          let plantas = productController.dataBaseProducts();
          let newPlanta = {
               "id": Date.now(),
               "name": req.body.name || 'sin nombre',
               "imagen": "imagen",
               "categoria": req.body.categoria || 'sin categoria',
               "disponible": req.body.disponible || 'sin disponibilidad',
               "precio": req.body.precio || 'sin precio',
               "cantidad": req.body.cantidad || 'sin cantidad'
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

          plantas.forEach((planta, i) => {
               if (planta.id == plantaId) {
                    planta.name = req.body.name;
                    planta.edad = req.body.edad;
                    

                    plantas[i] = planta
               }
          })
          fs.writeFileSync(productsPath,JSON.stringify(plantas,null,' '));

          res.redirect('/products/index')
          console.log('verificando que llega desde el nagegador', plantas);

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
     productList: (req, res) => {
          res.render('./products/productList');
     },
     productCart: (req, res) => {
          res.render('./products/productCart');
     }

};


module.exports = productController;