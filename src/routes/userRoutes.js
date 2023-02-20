const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');

router.get('/register',userController.register);
router.get('/login',/*middleware*/ userController.login);


// CRUD 
router.get('/list',userController.list);

router.get('/edit/:idUser', userController.edit);
router.put('/edit/:idUser', userController.update);

router.get('/delete/:idUser', userController.delete);
router.delete('/delete/:idUser', userController.destroy);

module.exports = router;