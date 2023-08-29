const express = require('express');
const router = express.Router();
// const passport = require('passport');

const Signup = require('../models/signup');

const catchAsync = require('../utils/catchAsync');

router.get('/', (req, res) => {
    res.render('auth/signup');
});

router.post('/', catchAsync(async (req, res) => {
        try{
            const {name, username, password, password_confirmation} = req.body.signup;
            const user = new Signup({ name, username });
            const registeredUser = await Signup.register(user, password);
            // console.log(registeredUser);
            req.flash('success', 'Registered Successfully!');
            res.redirect('/signup');
        }catch(e){
            req.flash('error', e.message);
            res.redirect('/signup');
        }
    })
);

module.exports = router;