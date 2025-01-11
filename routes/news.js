const express = require('express');
const axios = require('axios');
const authenticateToken = require('../middlewares/authMiddleware');
const User = require('../models/user');

const router = express.Router();

//Error Handling Middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// GET /news
router.get('/news', authenticateToken, async (req, res) => {
    try {
        // Fetch user preferences
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const preferences = user.preferences; // Array of strings
        if (!preferences || preferences.length === 0) {
            return res.status(400).json({ message: 'No preferences set. Please update your preferences.' });
        }

        // Build API query parameters
        const apiUrl = `${process.env.NEWS_API_BASE_URL}`;
        const query = preferences.join(' OR '); // Combine preferences with "OR" for the query
        const params = {
            apiKey: process.env.NEWS_API_KEY,
            language: 'en', // Default to English; you can customize based on requirements
            q: query,
        };
        
        // Fetch news articles
        const response = await axios.get(apiUrl, { params });
        
        // Send response to client
        res.status(200).json({ articles: response.data.articles });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Failed to fetch news articles.', error: error.message });
    }
});

module.exports = router;
