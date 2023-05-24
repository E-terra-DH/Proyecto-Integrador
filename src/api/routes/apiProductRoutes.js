const express = require('express');
const router = express.Router();
const apiProductController = require('../controller/apiProductController');

router.get('/', apiProductController.findAll) //find all
router.get('/:id', apiProductController.show); //este es para consultar en especifico
//router.post('/', controller.store); es el metodo de guardar, porque voy a crear guardar un registro. 
//router.delete('/:id', controller.delete); 
//router.get('/search', controller.search); 

module.exports = router

