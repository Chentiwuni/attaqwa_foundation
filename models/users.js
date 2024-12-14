// user.model.js (or similar model file)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure the username is unique
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add other fields as needed (e.g., email, address, etc.)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
