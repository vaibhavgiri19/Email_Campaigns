const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Dummy admin credentials (replace this with database lookup if needed)
const admin = {
    email: "admin@example.com",
    password: "$2a$10$ZyxR5Qe.pF/NU.yZBl/ruOShC0e2nWXHhNf5Cwbw4IqSMyRAkjVCW" // bcrypt hash of 'password123'
};

// Signup Controller
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database (mock example, replace with DB logic)
        admin.email = email;
        admin.password = hashedPassword;

        res.status(201).json({ message: "Signup successful. You can now log in." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during signup.", error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email matches
    if (email !== admin.email) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
