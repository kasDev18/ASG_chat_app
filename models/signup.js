const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

// signupSchema.statics.findAndValidate = async function(name){
//     const foundName = await this.findOne({name});
//     return foundName ? false : true;
// }

// signupSchema.pre('save', async function (next) {
//     //if password is not changed
//     // if (!this.isModified('password')) return next();

//     //else
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// })

SignupSchema.plugin(passportLocalMongoose);

// const Signup = new mongoose.model('Signup', signupSchema);
module.exports = mongoose.model('Signup', SignupSchema);