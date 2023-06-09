const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');

const Signup = require('./models/signup');
let status = '';
const AppError = require('./errors');

mongoose.connect('mongodb://localhost:27017/chatApp')
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

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

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
    const { id } = req.params;
    const users = await Signup.find({});
    const server = await Signup.findById(id);
    if(!server){
        return next(new AppError('User Not Found', 400));
    }
    res.render('admin/edit', { users, server });
}));

// 404 Page
app.use((req, res) => {
    status = 404;
    res.status(status).render('admin/error', { status });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})