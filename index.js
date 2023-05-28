const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const path = require('path');
const mongoose = require('mongoose');

const Signup = require('./models/signup')
mongoose.connect('mongodb://localhost:27017/chatApp')
    .then((res) => {
        console.log('connections successful')
    })
    .catch((err) => {
        console.log('error')
        // console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

app.get('/', (req, res) => {
    res.render('auth/login');
});

app.get('/signup', (req, res) => {
    res.render('auth/signup');
});

app.get('/admin', (req, res) => {
    res.render('admin/index');
});


app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})