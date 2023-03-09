const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const usersPath = path.join(__dirname, '../Data/users.json');
const dataBaseUsers = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require('bcryptjs');


const userController = {
     dataBaseUsers: () => { return JSON.parse(fs.readFileSync(usersPath, 'utf-8')); },// se crea aca para poder llamarla en metodos adelante
     index: (req, res) => {

          res.render('./users/userList', {
               title: 'Usuarios',
               usersList: dataBaseUsers
          });
     },


     login: (req, res) => {
          res.render('./auth/login');
     },
     




     register: (req, res) => {
          res.render('./users/register');
     },

     createUser: (req, res) => {

          // ERROR SI EL USUARIO YA EXISTE
          // let existingUser = userController.dataBaseUsers().findByField('email', req.body.email);

          // if(existingUser) {
          //      return res.render('../views/users/register', {
          //           errors: {
          //                email: {
          //                     msg: 'Este email ya está registrado'
          //                }
          //           },
          //           oldData: req.body
          //      })
          // }

          let users = userController.dataBaseUsers();
          let avatar = req.file.filename;
          let newUser = {
               "id": Date.now(),
               "email": req.body.email || 'sin nombre',
               "usuario": req.body.usuario || 'sin apellido',
               "contrasena": bcrypt.hashSync(req.body.contrasena, 10),
               "cel": req.body.cel || 'sin celular',
               "tipo": 'noAdmin',
               "avatar": avatar || 'sin avatar',
          }

          users.push(newUser);

          fs.writeFileSync(usersPath, JSON.stringify(users, null, ' '));

          res.redirect('/users/index');
     },

     edit: (req, res) => {
          let userId = req.params.id;

          let user = userController.dataBaseUsers().find(user => user.id == userId);
          res.render('./users/register', {
               title: 'Editando usuarios',
               user
          });
     },
     update: (req, res) => {
          let userId = req.params.id;
          let user = userController.dataBaseUsers()

          user.forEach((user, index) => {
               if (user.id == userId) {
                    user.nombre = req.body.name;
                    user.apellido = req.body.apellido;
                    user.email = req.body.email;
                    user.contraseña = req.body.contraseña;
                    user.tipo = req.body.tipo;
                    user.avatar = req.file.filename;

                    user[index] = user;
               }
          })

          fs.writeFileSync(usersPath, JSON.stringify(user, null, ' '));

     },

     delete: (req, res) => {
          let userId = req.params.id;
          let user = userController.dataBaseUsers().find(user => user.id == userId);

          res.render('products/delete', {
               title: 'Eliminando usuario',
               user
          });

     },
     destroy: (req, res) => {
          let userId = req.params.id;
          let user = userController.dataBaseUsers();

          newUser = user.filter(user => user.id != userId);

          fs.writeFileSync(usersPath, JSON.stringify(newUser, null, ' '));

          res.redirect('/users/index');

     },

     userProfile: (req, res) => {
          let userId = req.params.id;
          let user = userController.dataBaseUsers().find(user => user.id == userId);


          console.log(user);

          res.render('../views/users/userProfile.ejs', {
               title: 'user profile',
               user: user,
          })
     }
};

module.exports = userController;