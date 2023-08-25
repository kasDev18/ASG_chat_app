const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

signupSchema.statics.findAndValidate = async function(name){
    const foundName = await this.findOne({name});
    return foundName ? false : true;
}

signupSchema.pre('save', async function (next) {
    //if password is not changed
    // if (!this.isModified('password')) return next();

    //else
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


const Signup = new mongoose.model('Signup', signupSchema);
module.exports = Signup;