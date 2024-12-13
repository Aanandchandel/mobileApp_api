const jwt = require('jsonwebtoken');

// Secret key for verifying the token
const JWT_SECRET = process.env.JWT_SECRET; // Ideally, store this in an environment variable

// Middleware function to authenticate the JWT token
function authenticateJWT(req, res, next) {
  // Check for the token in the 'Authorization' header
  const token = req.headers.token

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // If token is valid, save the decoded user information in the request object
    req.user = user;

    // Pass control to the next middleware or route handler
    next();
  });
}

module.exports = authenticateJWT;
