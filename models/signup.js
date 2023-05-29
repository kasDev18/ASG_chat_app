const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

const Signup = new mongoose.model('Signup', signupSchema);

module.exports = Signup;