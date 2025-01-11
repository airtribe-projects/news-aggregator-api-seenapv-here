const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
           
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid.' });
        }
        req.user = user; // Attach user info to the request
        next();
    });
};

module.exports = authenticateToken;
