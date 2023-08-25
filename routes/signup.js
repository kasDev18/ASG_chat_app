const express = require('express');
const router = express.Router();

const Signup = require('../models/signup');

const catchAsync = require('../utils/catchAsync');

router.get('/', (req, res) => {
    res.render('auth/signup');
});

router.post('/', catchAsync(async (req, res) => {
        const newSignup = new Signup(req.body.signup);
        const validateUser = await Signup.findAndValidate(newSignup.name);
        if(!validateUser){
            req.flash('error', 'User already saved! Duplicated data!');
            res.redirect("/signup");
        }else{
            await newSignup.save();
            req.flash('success', 'User successfully created!');
            res.redirect("/signup");
        }
    })
);


// router.post('/', async (req, res) => {
//     const {name, username,password} = req.body.signup;
//     const newSignup = new Signup({name, username,password});
//     const validateUser = await Signup.findAndValidate(newSignup.name);
//     if(!validateUser){
//         req.flash('error', 'User already saved! Duplicate data!');
//         res.render("auth/signup");
//     }else{
//         await newSignup.save();
//         req.flash('success', 'User successfully created!');
//         res.render("auth/signup");
//     }
// });

module.exports = router;