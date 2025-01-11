const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const preferencesRoutes = require('./routes/preferences');
const newsRoutes = require('./routes/news');

require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to the MongoDB');
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
})
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/users', userRoutes);
app.use('/users', preferencesRoutes);
app.use('/', newsRoutes);

module.exports = app;