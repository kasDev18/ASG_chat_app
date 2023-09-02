const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');

const User = require('../models/User');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', catchAsync(async (req, res, next) => {
        try{
            const {name, username, password} = req.body.signup;
            const user = new User({ name, username });
            const registeredUser = await User.register(user, password);
            // console.log(registeredUser);
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', 'Registered Successfully!');
                res.redirect('/signup');
            });
        }catch(e){
            req.flash('error', e.message);
            res.redirect('/signup');
        }
    })
);

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/index';
    res.redirect(redirectUrl);
})

module.exports = router;