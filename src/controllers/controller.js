
const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('register');
    },
    productDetail: (req, res) => {
        return res.render('productDetail');
    },
    productCart: (req, res) => {
        return res.render('productCart');
    },    
    login: (req, res) => {
        return res.render('login');
    },
    productList: (req, res) => {
        return res.render('productList');
    },    
    formLoad: (req, res) => {
        return res.render('formLoad');
    }
};






module.exports = controller;