const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');

const admin = require('./routes/admin');
const signup = require('./routes/signup');

const Signup = require('./models/signup');

app.use('/admin', admin);
app.use('/signup', signup);

let status = '';

mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
    .then((res) => {
        console.log('connections successful')
    })
    .catch((err) => {
        console.log('error')
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

const wrapAsync = require('./utils/catchAsync');
const AppError = require('./utils/ExpressError');


app.get('/', (req, res) => {
    res.render('auth/login', {
        successMessage: false,
        errorMessage: false,
    });
});

<<<<<<< Updated upstream
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

app.get('/admin/:id', wrapAsync(async (req, res, next) => {
    const users = await Signup.find({});
    const server = await Signup.findById(id);
    res.render('admin/edit', { users, server });
}));

=======
>>>>>>> Stashed changes
// 404 Page
app.use((req, res) => {
    status = 404;
    res.status(status).render('admin/error', { status });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).render('errors', { err });
})

app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})