const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const User = require('../models/user');
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

// GET /preferences
router.get('/preferences', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// PUT /preferences
router.put('/preferences',
    [
        body('preferences')
            .isArray()
            .withMessage('Preferences must be an array.')
            .custom((value) => value.every((item) => typeof item === 'string'))
            .withMessage('Preferences array must contain only strings.'),
    ],
    authenticateToken,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            user.preferences = req.body.preferences;
            await user.save();

            res.status(200).json({ message: 'Preferences updated successfully.' });
        } catch (error) {
            console.error('Error updating preferences:', error);
            res.status(500).json({ message: 'Failed to update preferences.', error: error.message });
        }
    }
);

module.exports = router;
