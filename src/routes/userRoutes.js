const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multer');
const validateRegister = require('../middlewares/validationsRegister');
const adminMiddleware = require('../middlewares/adminMiddleware');

// const validateProductInfo = require('../middlewares/validations');

const userController = require('../controllers/userController');


/*----------------------------------------Rutas con MYSQL--------------------*/
router.get('/listado', adminMiddleware, userController.indice);
// router.post('/register',userController.create);


//REGISTRO
router.get('/register', userController.register); //Formulario de registro de usuarios
router.post('/register', upload.single('avatar'), validateRegister, userController.createUser); //Creación de un nuevo usuario


//LOGIN
router.get('/login',/*middleware*/ userController.login);
router.post('/login', userController.processLogin);


//PERFIL DE USUARIO
router.get('/profile', userController.profile);

router.get('/edit', userController.edit);
router.put('/edit', userController.update);

// router.get('/delete/:idUser', userController.delete);
// router.delete('/delete/:idUser', userController.destroy);

//router.get('/:id', userController.profile); //Detalle de usuario

module.exports = router;