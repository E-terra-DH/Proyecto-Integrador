const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');


// CRUD 
router.get('/index', userController.index);

//REGISTRO
router.get('/register', userController.register); //Formulario de registro de usuarios
router.post('/register', userController.store); //Creación de un nuevo usuario

//LOGIN
router.get('/login',/*middleware*/ userController.login);

//PERFIL DE USUARIO
// router.get('/profile/:idUser', userController.profile);

router.get('/edit/:idUser', userController.edit);
router.put('/edit/:idUser', userController.update);

router.get('/delete/:idUser', userController.delete);
router.delete('/delete/:idUser', userController.destroy);

module.exports = router;