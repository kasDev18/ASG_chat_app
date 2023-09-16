const Users = require('../models/User');

module.exports.index = async(req, res) => {
    if (req.isAuthenticated()) {
        const userID = req.user._id;
        const userEmail = req.user.username;
        const users = await Users.find({ _id: { $ne: userID } });
        console.log(users);
        res.render('landing/index' , { users, userID, userEmail });
    }
}