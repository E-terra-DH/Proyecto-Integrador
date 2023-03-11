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

    login: (req, res) => {
        res.render('./auth/login', {
            title: 'login'
        });
    },

    processLogin: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        let user = users.find(user => user.email == req.body.email);

        // VALIDAR SI EL USUARIO ESTÁ EN LA BASE DE DATOS
        if(user){ //Si encontré a la persona

            //VALIDAR CONTRASEÑA
            let passwordOk = bcrypt.compareSync(req.body.contrasena, user.contrasena);
            if(passwordOk){
                delete user.contrasena; // Borrar la contraseña del usuario
                req.session.userLogged = user; // Guardar la sesión del usuario
                 if (req.body.remember) {
                     res.cookie(
                         'userLogged',
                         user,
                         { maxAge: 60000 } // valor en milisigundos que va a guardar la cookie del lado del cliente 1 minuto
                     )
                 }
                res.redirect('/profile');
            } 
            return res.render('./auth/login', { //Si la contraseña no corresponde
                errors: {
                    contrasena: {
                        msg: "email o contraseña inválidos"
                    }
                }
            });
        }
        return res.render('./auth/login', { //Si el usuario no está en la base de datos
            errors: {
                email: {
                    msg: "No estás registrado"
                }
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy();//metodos de cookie-parser
        res.clearCookie('userLogged');//metodos de cookie-parser
        return res.redirect('/');
    },
    
    profile: (req, res) => {

        res.render('../views/users/userProfile', { 
            title: 'Profile',
            user: req.session.userLogged // Guardo el user logged en la variable user que llevo a la vista
        })
    }
};


module.exports = controller;