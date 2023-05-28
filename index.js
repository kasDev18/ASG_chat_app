const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

app.get('/', (req, res) => {
    res.render('auth/login');
});

app.get('/admin', (req, res) => {
    res.render('admin/index');
});


app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})