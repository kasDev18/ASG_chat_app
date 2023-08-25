const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

const Signup = require('./models/signup');

const adminRoutes = require('./routes/admin');
const signupRoutes = require('./routes/signup');

let status = '';

mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
    .then((res) => {
        console.log('connections successful')
    })
    .catch((err) => {
        console.log('error')
    })


const sessionOptions = { 
    secret: 'thisisnotagoodsecret',
    resave: false, 
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    } 
};
    
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(morgan('tiny'));
app.use('/admin', adminRoutes);
app.use('/signup', signupRoutes);

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

const AppError = require('./utils/ExpressError');
const { Sign } = require('crypto');


app.get('/', (req, res) => {
    res.render('auth/login', {
        successMessage: false,
        errorMessage: false,
    });
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