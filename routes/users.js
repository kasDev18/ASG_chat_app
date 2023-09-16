const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

const catchAsync = require('../utils/catchAsync');

// const User = require('../models/User');

router.route('/signup')
    .get(users.indexSignup)
    .post(catchAsync(users.signup));

router.route('/login')
    .get(users.indexLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        users.login);

router.route('/logout')
    .get(users.logout)

module.exports = router;