const express = require('express');
const router = express.Router();

const Signup = require('../models/signup');

const wrapAsync = require('../utils/catchAsync');

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennuggets') {
        next();
    }

    res.status(401).render("auth/login", {
        successMessage: false,
        errorMessage: 'Invalid Credentials',
    })
}

router.post('/', verifyPassword, async (req, res) => {
    res.render("admin/index")

    // const check = await Signup.findOne({ name: req.body })

    // try {
    //     if (check.password !== req.body.password && check.username !== req.body.username) {
    //         res.status(401).render("auth/login", {
    //             successMessage: false,
    //             errorMessage: 'Invalid Credentials',
    //         })
    //     }
    // } catch (err) {
    //     res.status(201).render("admin/index", {
    //         successMessage: 'User created successfully!',
    //         errorMessage: false,
    //     })
    // }
})

router.get('/', async (req, res) => {
    const users = await Signup.find({})
    res.render('admin/index', { users });
});

router.get('/:id', wrapAsync(async (req, res, next) => {
    const users = await Signup.find({});
    const server = await Signup.findById(id);
    res.render('admin/edit', { users, server });
}));


module.exports = router;