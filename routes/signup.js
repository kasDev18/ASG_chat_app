const express = require('express');
const router = express.Router();

const Signup = require('../models/signup');

const wrapAsync = require('../utils/catchAsync');

router.get('/', (req, res) => {
    res.render('auth/signup', {
        successMessage: false,
        errorMessage: false,
    });
});

router.post('/', async (req, res) => {
    const checking = await Signup.findOne({ name: req.body.name });
    try {
        if (checking.name === req.body.name && checking.password === req.body.password) {
            res.status(401).render("auth/signup", {
                successMessage: false,
                errorMessage: 'User already exists',
            })
        }
    }
    catch {
        const newSignup = new Signup(req.body);

        if (newSignup.password !== newSignup.password_confirmation) {
            res.status(401).render("auth/signup", {
                successMessage: false,
                errorMessage: 'Password and confirm password does not match',
            })

        } else {
            await newSignup.save();
            console.log(newSignup);
            res.status(201).render("auth/signup", {
                successMessage: 'User created successfully!',
                errorMessage: false,
            });
        }
    }
});


module.exports = router;