const express = require('express');
const router = express.Router();
const apiUsersController = require('../controller/apiUsersController');

router.get('/', apiUsersController.list);
router.get('/:id', apiUsersController.detail);
//router.get('/:id', controller.show); este es para consultar en especifico
//router.post('/', controller.store); es el metodo de guardar, porque voy a crear guardar un registro. 
//router.delete('/:id', controller.delete); 
//router.get('/search', controller.search); 

module.exports = router
