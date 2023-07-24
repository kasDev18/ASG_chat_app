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