const express = require('express');
const router = express.Router();
const landing = require('../controllers/landing');
const { isLoggedIn } = require('../middleware');
// const Users = require('../models/User');

// const wrapAsync = require('../utils/catchAsync');

router.route('/index')
    .get(isLoggedIn,
        landing.index);

module.exports = router;