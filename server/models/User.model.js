const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // removes white space
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required.'],
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
