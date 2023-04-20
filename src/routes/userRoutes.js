const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multer');
const validateRegister = require('../middlewares/validationsRegister');

// const validateProductInfo = require('../middlewares/validations');

const userController = require('../controllers/userController');


// CRUD 
//Creando indice de usuarios  en la base de datos MySQL


// // add users
// router.get('/', userController.add);
// // Create a new user
// router.post('/', userController.create);
// // Edit a user
// router.get('/:id', userController.edit);
// // Update a user
// router.put('/:id', userController.update);
// //Delete a user
// router.get('/:id', userController.delete);
// //Destroy a user
// router.post('/destroy/:id', userController.destroy);


//REGISTRO
router.get('/register', userController.register); //Formulario de registro de usuarios
router.post('/register', upload.single('avatar'), validateRegister, userController.createUser); //Creación de un nuevo usuario

//LOGIN
// router.get('/login',/*middleware*/ userController.login);
//router.post('/login', userController.processLogin);


//PERFIL DE USUARIO
// router.get('/profile/:idUser', userController.profile);

router.get('/edit/:idUser', userController.edit);
router.put('/edit/:idUser', userController.update);

router.get('/delete/:idUser', userController.delete);
router.delete('/delete/:idUser', userController.destroy);

//router.get('/:id', userController.profile); //Detalle de usuario

module.exports = router;