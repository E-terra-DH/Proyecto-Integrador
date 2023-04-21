const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const { validationResult } = require('express-validator'); // Aquí desestructuramos algo cuando es propio de un módulo.
const bcrypt = require('bcryptjs');
const { name } = require('ejs');

//Llamado a modelos
// const {Product, ProductCategory} = require('../../database/models');
const db = require('../../database/models');
const sequelize = db.sequelize;
const User = db.User;
const UserCategory = db.UserCategory;

const deniseController = {
    registerMy : async (req,res) => {
        res.render('../views/users/registerMysql', {User});
    },

    registerProcess : async (req,res) => {
          //ERRORES DE VALIDACIÓN
        const errors = validationResult(req);
          if(!errors.isEmpty()){
            return res.render('../views/users/registerMysql', {
                title: 'Nuevo usuario',
                mensajeDeError: errors.mapped(),
                oldBOdy: req.body
            });
        }
          const newUser = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            tipo: 'User',
            userCategory_id: req.body.userCategory_id ? req.body.userCategory_id : '1' ,
        }
           db.User.create(newUser, {
            include: 'userCategory'
        })
        .then(()=> {
        res.redirect('../views/users/index');
        })
        .catch (error => res.render('error'));
    },

    editMy : async (req, res) =>{
        db.User.findByPk(req.params.id)
        .then((User) =>{
            res.render('editMysql', {User});
        });
   },
   updateMy: (req, res) => {
       //aca hay que capturar el id. viaja la data de lo que viene del formulario, yo lo recibo. Armamos el registro igual al add.  
       db.User.updateMy({    
        name: req.body.name,
        imagen : file ? file.filename : avatar.jpg,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        tipo: 'User',
        userCategories_id: req.body.userCategories_id ? req.body.userCategories_id : '1' ,
       },{ 
        where:{
            id: req.params.id
        }
    }
    )
    .then(() =>{
        return res.redirect('/userListMtsql');
    })
    .catch(error => res.send('error'));
    },

    loginMy: async (req, res) => {
        res.render('../views/auth/loginMysql', {User});
            title: 'login';
    },

    loginProcess: async (req, res) => {
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
    },

    logoutMy: async (req, res) => {
        req.session.destroy();//metodos de cookie-parser
        res.clearCookie('userLogged');//metodos de cookie-parser
        return res.redirect('/');
    },
    
    deleteMy:  (req,res) => {
        let userId = req.params.id;
        User
        .findByPk(userId)
        .then(User => {
            return res.render(path.resolve(__dirname, '..', 'views',  'deleteMysql'), {User})})
        .catch(error => res.send(error))
    },
    destroyMy: function (req,res) {
        let userId = req.params.id;
        user
        .destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/userListMtsql')})
        .catch(error => res.send(error)) 
    }
}



module.exports = deniseController;
