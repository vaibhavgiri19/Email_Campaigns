const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaigns");
const cron = require("node-cron");
const Campaign = require("./models/Campaign");
const sendEmail = require("./utils/sendEmail");
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/campaigns", campaignRoutes); // Campaign routes

// Schedule and send campaigns
const scheduleCampaigns = async () => {
  try {
    console.log("Checking for scheduled campaigns...");
    const now = new Date();
    const campaigns = await Campaign.find({ scheduleAt: { $lte: now }, sent: false });

    for (const campaign of campaigns) {
      for (const recipient of campaign.recipients) {
        try {
          const status = await sendEmail(recipient, campaign.subject, campaign.content);
          campaign.deliveryStatus.push({ email: recipient, status: status.success ? "Success" : "Failed" });
        } catch (error) {
          console.error(`Error sending email to ${recipient}: ${error.message}`);
          campaign.deliveryStatus.push({ email: recipient, status: "Failed" });
        }
      }
      campaign.sent = true; // Mark campaign as sent
      await campaign.save();
    }
  } catch (error) {
    console.error(`Error scheduling campaigns: ${error.message}`);
  }
};

// Schedule the campaign checker to run every minute
cron.schedule("* * * * *", scheduleCampaigns);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
