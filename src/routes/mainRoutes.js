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


router.get('/admin', mainController.admin);
router.get('/logout', mainController.logout);
router.get('/:id', guestMdlw, mainController.profile);


module.exports = router;