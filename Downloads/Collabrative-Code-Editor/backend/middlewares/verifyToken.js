const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Extract the token from the authorization header
    const token = req.headers['authorization']?.split(' ')[1]; 

    // If no token is provided, return an error
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    // Verify the token using the secret stored in environment variables
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err); // Log the error for debugging
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        // Save the user ID from the token for further use
        req.userId = decoded.id; 
        next(); // Call the next middleware or route handler
    });
};

module.exports = verifyToken;
