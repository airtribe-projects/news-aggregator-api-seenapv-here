const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import User model
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

//Error Handling Middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// POST /signup
router.post('/signup',
    [
        body('email').isEmail().withMessage('Invalid email format.'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { username, email, password, preferences } = req.body;

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save the user
            const newUser = new User({ username, email, password: hashedPassword, preferences });
            await newUser.save();

            res.status(200).json({ message: 'User registered successfully.' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Registration failed.', error: error.message });
        }
    }
);

// POST /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
