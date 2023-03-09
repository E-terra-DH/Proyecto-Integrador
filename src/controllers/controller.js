const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../Data/users.json');



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
        let user = users.find(user => user.name == req.body.name);

        console.log(users);
        console.log(user);
        console.log(userLogged);


        if (user) {
            req.session.userLogged = user;
            if (req.body.remember) {
                res.cookie(
                    'userLogged',
                    user,
                    { maxAge: 60000 } // valor en milisigundos que va a guardar la cookie del lado del cliente 1 minuto
                )

            }
            res.redirect('.users/profile');
        }
    },

    logout: (req, res) => {
        req.session.destroy();//metodos de cookie-parser
        req.clearCookie('userLogged')//metodos de cookie-parser
        return res.redirect('/');


    },
    profile: (req, res) => {
        res.render('./users/profile', {
            title: 'Profile',
            user: req.session.userLogged
        })
    }
};

module.exports = controller;