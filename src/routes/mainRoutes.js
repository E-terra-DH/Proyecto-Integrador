const express = require('express');
const router = express.Router();
const path = require('path');

const mainController = require('../controllers/controller');

router.get('/', mainController.index);

module.exports = router;