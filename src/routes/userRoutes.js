const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multer');
const validateRegister = require('../middlewares/validationsRegister');

// const validateProductInfo = require('../middlewares/validations');

const userController = require('../controllers/userController');


// CRUD 
router.get('/index', userController.index);

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