const express = require('express');
const router = express.Router();
const landing = require('../controllers/landing');
// const Users = require('../models/User');

// const wrapAsync = require('../utils/catchAsync');

router.route('/index')
    .get(landing.index);

module.exports = router;