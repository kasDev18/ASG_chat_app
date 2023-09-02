const express = require('express');
const router = express.Router();


const wrapAsync = require('../utils/catchAsync');

router.get('/index', (req, res) => {
    res.render('landing/index');
});

module.exports = router;