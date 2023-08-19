const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');

const Signup = require('./models/signup');

const adminRoutes = require('./routes/admin');
const signupRoutes = require('./routes/signup');

app.use(morgan('tiny'));
app.use('/admin', adminRoutes);
app.use('/signup', signupRoutes);

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
const { Sign } = require('crypto');


app.get('/', (req, res) => {
    res.render('auth/login', {
        successMessage: false,
        errorMessage: false,
    });
});

app.post('/signup', async (req, res) => {
    const newSignup = new Signup(req.body.signup);
    const validateUser = await Signup.findAndValidate(newSignup.name);
    if(!validateUser){
        res.render("auth/signup", {
            successMessage: false,
            errorMessage: 'Given name was already saved! Duplicate Data!',
        });
    }else{
        await newSignup.save();
        res.render("auth/signup", {
            successMessage: 'User created successfully!',
            errorMessage: false,
        });
    }
});

// 404 Page
app.use((req, res) => {
    status = 404;
    res.status(status).render('admin/error', { status });
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no! Something went wrong";
    res.status(statusCode).render('errors', { err });
})
app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})