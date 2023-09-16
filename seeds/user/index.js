const mongoose = require('mongoose');
const { name, username, password, isOnline } = require('./seeds');
const Signup = require('../../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/chatApp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Signup.deleteMany({});

    for (let i = 0; i < name.length; i++) {
        const new_user = new Signup({
            name: name[i],
            username: username[i],
            isOnline: isOnline[i],
            password: password[i]
        })

        await new_user.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});