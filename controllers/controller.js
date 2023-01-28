
const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('register');
    },
    productDetail: (req, res) => {
        return res.render('productDetail');
    }

};




module.exports = controller;