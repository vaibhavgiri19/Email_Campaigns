require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Options
const corsOptions = {
  origin: 'https://email-campaigns-git-main-vaibhav-giris-projects.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions));
// Middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
