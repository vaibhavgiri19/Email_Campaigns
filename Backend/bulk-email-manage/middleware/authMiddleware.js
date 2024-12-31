const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header (remove 'Bearer ' part)
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded user info for further use in the route
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
