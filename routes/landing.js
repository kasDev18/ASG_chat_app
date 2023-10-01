const express = require('express');
const router = express.Router();
const landing = require('../controllers/landing');
const { isLoggedIn } = require('../middleware');
// const Users = require('../models/User');

const wrapAsync = require('../utils/catchAsync');

router.route('/')
    .get(isLoggedIn,
        landing.index);

router.route('/:id')
    .get(isLoggedIn,
        wrapAsync(landing.edit));

module.exports = router;