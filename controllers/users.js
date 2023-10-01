const User = require('../models/User');

module.exports.indexSignup = (req, res) => {
    res.render('auth/signup');
}

module.exports.signup = async (req, res, next) => {
    try{
        const {name, username, password} = req.body.signup;
        const user = new User({ name, username });
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Registered Successfully!');
            res.redirect('/signup');
        });
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.indexLogin = (req, res) => {
    res.render('auth/login');
};

module.exports.login = async(req, res) => {
    req.flash('success', 'Welcome back '+ req.user.name.toUpperCase() + '!');
    const redirectUrl = res.locals.returnTo || '/landing';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
}