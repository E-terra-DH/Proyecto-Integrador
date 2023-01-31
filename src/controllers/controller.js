
const controller = {
    index: (req, res) => {
         res.render('./users/index');
    },
    register: (req, res) => {
         res.render('./users/register');
    },
    productDetail: (req, res) => {
         res.render('./products/productDetail');
    },
    productCart: (req, res) => {
         res.render('./products/productCart');
    },    
    login: (req, res) => {
         res.render('./users/login');
    },
    productList: (req, res) => {
         res.render('./products/productList');
    },    
    formLoad: (req, res) => {
         res.render('formLoad');
    }
};



module.exports = controller;