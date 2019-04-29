const jwt = require("jsonwebtoken")
require('dotenv').config()


// Middleware to check token for private routes

function auth(req, res, next) {
    const token = req.header("x-auth-token");

    // Check for token
    // error 401 = unauthorized
    if (!token) return res.status(401).json({ msg: "No token, authorization denied." });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user from payload
        req.user = decoded;

        // Call next piece of middleware
        next();
    }
    catch (e) {
        res.status(400).json({ msg: "Token is not valid" });
    }
}

module.exports = auth;

