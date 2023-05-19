const fs = require('fs');
const path = require('path');
const usersPath = path.resolve(__dirname, '../Data/users.json');
const bcrypt = require('bcryptjs');

const controller = {
    index: (req, res) => {
        res.render('./users/index', {
            title: 'e-Terra Home'
        });
    },

    // public: (req, res) => {
    //     let imagen= req.params.name

    //     res.sendFile('imagen')
    // },



    profile: (req, res) => {

        res.render('../views/users/userProfile.ejs', {
            title: 'user profile',
            user: req.session.userLogged || req.session.admin, // Guardo el user logged en la variable user que llevo a la vista
        })
    },

    logout: (req, res) => {
        req.session.destroy();//metodos de cookie-parser
        res.clearCookie('userLogged', 'adminLogged');//metodos de cookie-parser
        res.clearCookie('adminLogged');//metodos de cookie-parser
        return res.redirect('/');
    },

}

module.exports = controller;