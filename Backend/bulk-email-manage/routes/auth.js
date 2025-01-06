const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import the User model
const router = express.Router();

const signup = async (req, res) => {
    try {
        console.log(req.body);  // Add this line to check if the data is received correctly

        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "Signup successful. You can now log in." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during signup.", error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
