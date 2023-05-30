// metodos de JSON 
const bcrypt = require('bcryptjs');
//const path = require('path');
//const usersPath = path.join(__dirname, '../Data/users.json');
//const fs = require('fs');
//const dataBaseUsers = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const { validationResult } = require('express-validator')

//llamado de modelos
const { User, UserCategory } = require('../../database/models');
const { ValidationError } = require('sequelize');


/*--------------------------------------------TODO SOBRE JSON----------------------------------*/
const userController = {
     /*JSON */
     //dataBaseUsers: () => { return JSON.parse(fs.readFileSync(usersPath, 'utf-8')); },// se crea aca para poder llamarla en metodos adelante
     /*MYSQL */
     indice: async (req, res) => {
          try {
               const userList = await User.findAll();
               //const userCategory = await UserCategory.findAll();
               // res.json(user)
               res.render('../views/users/userList.ejs', { userList });
          } catch (error) {
               res.json(error)
          }
     },

     register: (req, res) => {
          res.render('./users/register');
     },

     createUser: async (req, res) => {

          // ERRORES DE VALIDACIÓN
          let errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.render('./users/register', {
                    title: 'Nuevo usuario',
                    mensajeDeError: errors.mapped(),
                    oldBOdy: req.body
               });
          }

          let userToCreate = await User.findOne({
               where: {
                    email: req.body.email,
               }
          });

          if (userToCreate) {

               return res.render('./users/register', {

                    errors: {
                         email: {
                              msgregistered: 'Este email ya está resgistrado'
                         }
                    },
                    oldBody: req.body
               });
          };

          // let avatar = req.file.filename;
          let avatar = req.file ? req.file.filename : "userdefault.png";
          let newUser = {
               email: req.body.email,
               name: req.body.nombre || 'sin nombre',
               surname: req.body.apellido || 'sin apellido',
               password: bcrypt.hashSync(req.body.contrasena, 10),
               phone: req.body.cel || 'sin celular',
               user_categories_id: '2',
               avatar: avatar
          }

          await User.create(newUser)

          res.redirect('/login');




          // try {
          //      //let users = userController.dataBaseUsers();

          //      //let avatar = req.file.filename;


          // } catch (error) {
          //      res.json('error')

          // }

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


          // users.push(newUser);

          //fs.writeFileSync(usersPath, JSON.stringify(users, null, ' '));


     },

     login: (req, res) => {
          res.render('./auth/login', {
               title: 'login'
          });
     },

     processLogin: async (req, res) => {
          const error = validationResult(req);

          if (!error.isEmpty()) {
               return res.render('./auth/login', {

                    error: error.mapped(),
               });
          };

          try {

               let userToLogin = await User.findOne({
                    where: {
                         email: req.body.email
                    }
               });

               if (!userToLogin) {

                    return res.render('auth/login', {

                         errors: {
                              email: {
                                   msg: 'Email no resgistrado'
                              }
                         },
                         oldBody: req.body
                    });
               };

               const confirmPassword = bcrypt.compareSync(req.body.contrasena, userToLogin.password);

               if (!confirmPassword) {

                    return res.render('auth/login', {

                         errors: {
                              contrasena: {
                                   msg: 'Contraseña incorrecta'
                              }
                         },
                    });
               };

               if (userToLogin.user_categories_id === 1) {
                    delete userToLogin.dataValues.password;

                    req.session.admin = userToLogin.dataValues;

                    if (req.body.rememberme) {

                         res.cookie('userCookie', userToLogin.dataValues, { maxage: 1000 * 60 * 60 });
                    };

                    return res.redirect('/users/profile/' + userToLogin.id);
               };

               if (userToLogin.user_categories_id === 2) {
                    delete userToLogin.dataValues.password;

                    req.session.userLogged = userToLogin.dataValues;

                    if (req.body.rememberme) {

                         res.cookie('userCookie', userToLogin.dataValues, { maxage: 1000 * 60 * 60 });
                    };

                    res.redirect('/users/profile/' + userToLogin.id);
               };
          } catch (error) {
               res.render('error');
          }
     },


     edit: async (req, res) => {
          try {
               const user = await User.findByPk(req.params.id);
               res.render("../views/users/formularioEditUser", {
                    title: "Mi User",
                    user

               });
          } catch (error) {
               res.send(error)
          }
     },


     update: async (req, res) => {
          try {
               const user = await User.findByPk(req.params.id);
               // return res.json({ user })

               await User.update(
                    {
                         name: req.body.name,
                         surname: req.body.surname,
                         email: req.body.email,
                         phone: req.body.phone,
                         avatar: req.file ? req.file.filename : "userdefault.png",

                    },


                    {
                         where: { id: req.params.id }
                    })

               return res.redirect('/users/profile/' + req.params.id);


          } catch (error) {
               res.json(error)
          }


     },



     delete: async (req, res) => {
          try {
               const user = await User.findByPk(req.params.id);
               res.render("../views/users/delete", {
                    title: "Borrar usuario",
                    user: user
               });
          } catch (error) {
               res.send(error)
          }
     },





     destroy: async (req, res) => {
          try {
               const user = await User.destroy({
                    where: { id: req.params.id }

               });

               return res.json({
                    data: user,
                    msg: 'elimanado con exito'
               })

          }
          catch (error) {
               res.send(error);
          }




     },

     profile: async (req, res) => {
          try {

               let profile = await User.findByPk(req.params.id)

               res.render("../views/users/userProfile.ejs", {
                    title: "Profile",
                    user: profile
               })

          } catch (error) {
               res.json(error)
          }




          // let profile = req.session.userLogged || req.session.admin;

          // res.render("../views/users/userProfile.ejs", {
          //      title: "Profile",
          //      user: profile
          // });
     }

};

module.exports = userController