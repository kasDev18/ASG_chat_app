const express = require('express');
const router = express.Router();
const Users = require('../models/User');

const wrapAsync = require('../utils/catchAsync');

router.get('/index', async(req, res) => {
    if (req.isAuthenticated()) {
        const userID = req.user._id;
        const userEmail = req.user.username;
        const users = await Users.find({ _id: { $ne: userID } });
        console.log(users);
        res.render('landing/index' , { users, userID, userEmail });
    }
});

module.exports = router;