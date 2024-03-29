const Users = require('../models/User');

module.exports.index = async(req, res) => {
    if (req.isAuthenticated()) {
        const userID = req.user._id;
        const userEmail = req.user.username;
        const userName = req.user.name;
        // const userName = req.user.name;
        // console.log(userName);
        const users = await Users.find({ _id: { $ne: userID } });
        res.render('landing/index' , { users, userID, userEmail, userName });
    }
}

module.exports.edit = async(req, res) => {
    if (req.isAuthenticated()) {
        // const user = await Users.findById(req.params.id);
        const userID = req.user._id;
        const userEmail = req.user.username;
        const userName = req.user.name;
        // console.log(userName);
        const users = await Users.find({ _id: { $ne: userID } });
        res.render('landing/edit' , { users, userID, userEmail, userName });
    }
}