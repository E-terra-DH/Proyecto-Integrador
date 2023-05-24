const express = require('express');
const router = express.Router();
const guestMdlw = require('../middlewares/guestMdlw');
const authMdlw = require('../middlewares/authMdlw');
const adminMiddleware = require('../middlewares/adminMiddleware');
// const userSessionMdlw = require('../middlewares/userSessionMdlw');

const mainController = require('../controllers/controller');
const userController = require('../controllers/userController');


router.get('/', mainController.index);

router.get('/login', authMdlw, userController.login);
router.post('/login', authMdlw, userController.processLogin);

router.get('/profile', userController.profile);

router.get('/logout', mainController.logout);
// router.get('/public/Images/:name', mainController.public)


module.exports = router;