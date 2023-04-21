const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multer');
const validateRegister = require('../middlewares/validationsRegister');

const deniseController = require('../controllers/deniseController');

//CRUD -> Creando indice de usuarios  en la base de datos MySQL

//add & create users
router.get('/users/registerMysql', deniseController.registerMy);
router.post('/users/registerMysql', deniseController.registerProcess);

// Edit & update user
router.get('/users/editMysql/:id', deniseController.editMy);
router.put('/users/editMysql/:id', deniseController.updateMy);

// login rutes
router.get('/loginMy',  deniseController.loginMy);
router.post('/loginMy', deniseController.loginProcess);

 // logout rutes
router.post('/logoutMy', deniseController.logoutMy);

//Delete & destroy user
router.get('/users/deleteMysql/:id', deniseController.deleteMy);
router.post('/destroy/:id', deniseController.destroyMy);

module.exports = router;