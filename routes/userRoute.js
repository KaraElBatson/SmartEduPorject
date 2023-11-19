const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');
//email kontrolü için
const User = require('../models/User');
const router = express.Router();

router.route('/signup').post(
    [
      //Name control
      body('name').not().isEmpty().withMessage('Please Enter Your Name'),
      //email control
      body('email').isEmail().withMessage('Please Enter Valid Email')
      //kaydolmuş bir email ile kaydolma da  hata döndürme  
      .custom((userEmail) => {
          return User.findOne({ email: userEmail }).then((user) => {
            if (user) {
              return Promise.reject('Email is already exists!');
            }
          });
        }),
      //password  control
      body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],
    authController.createUser
  );
router.route('/signin').post(authController.LoginUser);
router.route('/logout').get(authController.logoutUser);
// dashboarda bir istek gelince once authmiddleware kontrol edilir sorun yoksa devam edilir
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);
module.exports = router;