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

    // login: (req, res) => {
    //     res.render('./auth/login', {
    //         title: 'login'
    //     });
    // },

    // processLogin: (req, res) => {
    //     let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    //     let user = users.find(user => user.email == req.body.email);

    //     // VALIDAR SI EL USUARIO ESTÁ EN LA BASE DE DATOS
    //     if (user) { //Si encontré a la persona
    //         //VALIDAR CONTRASEÑA
    //         let passwordOk = bcrypt.compareSync(req.body.contrasena, user.contrasena);
    //         if(passwordOk){
    //             delete user.contrasena; // Borrar la contraseña del usuario

    //             //SI USUARIO ADMINISTRADOR
    //             //if (userCategories_id == '1') {
    //             if (user.tipo == 'Admin') {    
    //                 req.session.admin = user; // Guardar la sesión del administrador
    //                 if (req.body.remember) {
    //                     res.cookie(
    //                         'adminLogged',
    //                         user,
    //                         { maxAge: 60000 * 30} // valor en milisigundos que va a guardar la cookie del lado del cliente 1 minuto
    //                     )
    //                 }
    //                 res.redirect('/admin');
    //             } else {
    //             // SI USUARIO NO ADMINISTRADOR
    //                 req.session.userLogged = user; // Guardar la sesión del usuario
    //                 if (req.body.remember) {
    //                     res.cookie(
    //                         'userLogged',
    //                         user,
    //                         { maxAge: 60000 * 30} // valor en milisigundos que va a guardar la cookie del lado del cliente 1 minuto
    //                     )
    //                 }
    //                 res.redirect('/profile');
    //             } 
            
    //         return res.render('./auth/login', { //Si la contraseña no corresponde
    //             errors: {
    //                 contrasena: {
    //                     msg: "email o contraseña inválidos"
    //                 }
    //             }
    //         });
    //         }
    //         return res.render('./auth/login', { //Si el usuario no está en la base de datos
    //             errors: {
    //                 email: {
    //                     msg: "No estás registrado"
    //                 }
    //             }
    //         })
    //     }
    // },

    profile: (req, res) => {

        res.render('../views/users/userProfile.ejs', {
             title: 'user profile',
             user: req.session.userLogged || req.session.admin, // Guardo el user logged en la variable user que llevo a la vista
        })
    },
    
    logout: (req, res) => {
        req.session.destroy();//metodos de cookie-parser
        res.clearCookie('userLogged','adminLogged');//metodos de cookie-parser
        res.clearCookie('adminLogged');//metodos de cookie-parser
        return res.redirect('/');
    },

}

module.exports = controller;