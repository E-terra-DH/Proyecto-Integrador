const express = require('express');
const router = express.Router();
const guestMdlw = require('../middlewares/guestMdlw');
const authMdlw = require('../middlewares/authMdlw');

const mainController = require('../controllers/controller');

router.get('/', mainController.index);

router.get('/login',authMdlw,mainController.login);
router.post('/login',mainController.processLogin);

router.get('/logout',guestMdlw,mainController.logout);

router.get('/profile',guestMdlw,mainController.profile);

module.exports = router;