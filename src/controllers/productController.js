const productController =  {
    productDetail: (req, res) => {
        res.render('./products/productDetail');
   },
   productCart: (req, res) => {
        res.render('./products/productCart');
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