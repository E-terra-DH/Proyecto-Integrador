// metodos de JSON 
const bcrypt = require('bcryptjs');
const path = require('path');
const usersPath = path.join(__dirname, '../Data/users.json');
const fs = require('fs');
const dataBaseUsers = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const { validationResult } = require('express-validator')

//llamado de modelos
const { User, UserCategory } = require('../../database/models');
const { ValidationError } = require('sequelize');

// const userController = {
//      register: (req, res) => {
//           res.render('./users/register')
//      },

//      create: async (req, res) => {
//           const error = validationResult(req);
//           if (!error.isEmpty()) {
//                return res.render('users/register', {
//                     error: error.mapped(),
//                     oldBody: req.body
//                })
//           };
//           try {
//                const newUser = {
//                     name: req.body.name,
//                     surname: req.body.surname,
//                     email: req.body.email,
//                     password: bcrypt.hashSync(req.body.password, 10),
//                     phone: req.body.phone,
//                     avatar: 'usuarioDefault.jpg',
//                     user_categories_id: req.body.category ? req.body.category : '1'
//                };

//                const badEmail = await User.findOne({
//                     where: {
//                          email: req.body.email
//                     }
//                });
//                if (badEmail) {
//                     return res.render('users/register', {
//                          error: {
//                               email: {
//                                    msg: 'El email ya existe'
//                               }
//                          },
//                          oldBody: req.body
//                     });
//                };

//                await User.create(newUser, {
//                     include: 'userCategories'
//                });

//                res.redirect('/login');




//           } catch (error) {
//                res.render('error')

//           }
//      }
// }
/*--------------------------------------------TODO SOBRE JSON----------------------------------*/
const userController = {
     dataBaseUsers: () => { return JSON.parse(fs.readFileSync(usersPath, 'utf-8')); },// se crea aca para poder llamarla en metodos adelante
     index : async (req, res) => {
          try{
               const User = await User.findAll();
               const UserCategory = await UserCategory.findAll();
               res.render('../views/users/userListMysql.ejs', {User,UserCategory});
          } catch (error) {
               res.json(error)
          }
     },

     register: (req, res) => {
          res.render('./users/register');
     },

     createUser: (req, res) => {

          // ERRORES DE VALIDACIÓN
          let errors = validationResult(req);
          if(!errors.isEmpty()){
               return res.render('./users/register', {
                    title: 'Nuevo usuario',
                    mensajeDeError: errors.mapped(),
                    oldBOdy: req.body
               });
          }

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
               "idUser": Date.now(),
               "email": req.body.email,
               "nombre": req.body.nombre || 'sin nombre',
               "apellido": req.body.apellido || 'sin apellido',
               "contrasena": bcrypt.hashSync(req.body.contrasena, 10),
               "cel": req.body.cel || 'sin celular',
               "tipo": 'User',
               "avatar": avatar || 'sin avatar',
          }

          users.push(newUser);

          fs.writeFileSync(usersPath, JSON.stringify(users, null, ' '));

          res.redirect('/login');
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

     profile: (req, res) => {
          let userId = req.params.id;
          let user = userController.dataBaseUsers().find(user => user.id == userId);


          console.log(user);

          res.render('../views/users/userProfile.ejs', {
               title: 'user profile',
           user: user,
          })
     }
};

module.exports = userController