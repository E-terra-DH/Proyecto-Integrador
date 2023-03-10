const express = require('express');
const router = express.Router();
const guestMdlw = require('../middlewares/guestMdlw');
const authMdlw = require('../middlewares/authMdlw');
// const userSessionMdlw = require('../middlewares/userSessionMdlw');

const mainController = require('../controllers/controller');


router.get('/', mainController.index);

router.get('/login', authMdlw, mainController.login);
router.post('/login', authMdlw, mainController.processLogin);

router.get('/profile', guestMdlw, mainController.profile);
router.get('/logout', mainController.logout);


module.exports = router;