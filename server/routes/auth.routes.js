const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Signup route
router.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password
        const salt = await bcrypt.genSaltSync(13);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({ username, passwordHash: hashedPassword });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error)
    }
});

// Login route
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username }).lean() // .lean() returns a plain JS object instead of a mongoose object;
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        delete existingUser.passwordHash;
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            existingUser, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' , algorithm: 'HS256'}); // { expiresIn: '1d' } means that the token will be valid for 1 day

        res.status(200).json({ token });
    } catch (error) {
        next(error)
    }
});

module.exports = router;
