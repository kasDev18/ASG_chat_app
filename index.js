const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path = require('path');
const mongoose = require('mongoose');

const Signup = require('./models/signup');

mongoose.connect('mongodb://localhost:27017/chatApp')
    .then((res) => {
        console.log('connections successful')
    })
    .catch((err) => {
        console.log('error')
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

app.get('/', (req, res) => {
    res.render('auth/login', {
        successMessage: false,
        errorMessage: false,
    });
});

app.get('/signup', (req, res) => {
    res.render('auth/signup', {
        successMessage: false,
        errorMessage: false,
    });
});

app.post('/signup', async (req, res) => {
    const checking = await Signup.findOne({ name: req.body.name });
    try {
        if (checking.name === req.body.name && checking.password === req.body.password) {
            res.status(401).render("auth/signup", {
                successMessage: false,
                errorMessage: 'User already exists',
            })
        } else if (req.body.password !== req.body.password_confirmation) {
            res.status(401).render("auth/signup", {
                successMessage: false,
                errorMessage: 'Password and confirm password does not match',
            })
        }
    }
    catch (err) {
        const newSignup = new Signup(req.body);
        await newSignup.save();
        console.log(newSignup);
        res.status(201).render("auth/signup", {
            successMessage: 'User created successfully!',
            errorMessage: false,
        })
    }
})


app.post('/admin', async (req, res) => {

    const check = await Signup.findOne({ name: req.body.name })

    try {
        if (check.password !== req.body.password && check.username !== req.body.username) {
            res.status(401).render("auth/login", {
                successMessage: false,
                errorMessage: 'Invalid Credentials',
            })
        }
    } catch (err) {
        res.status(201).render("admin/index", {
            successMessage: 'User created successfully!',
            errorMessage: false,
        })
    }
})

app.get('/admin', async (req, res) => {
    const users = await Signup.find({})
    res.render('admin/index', { users });
});

app.get('/admin/:id', async (req, res) => {
    const { id } = req.params;
    const users = await Signup.find({});
    const server = await Signup.findById(id);
    res.render('admin/edit', { users, server });
});


app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})