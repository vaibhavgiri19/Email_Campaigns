const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaigns");
const cron = require("node-cron");
const Campaign = require("./models/Campaign");
const sendEmail = require("./utils/sendEmail");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);


cron.schedule("* * * * *", async () => {
    console.log("Checking for scheduled campaigns...");
    const now = new Date();
    const campaigns = await Campaign.find({ scheduleAt: { $lte: now }, sent: false });
  
    for (const campaign of campaigns) {
      for (const recipient of campaign.recipients) {
        const status = await sendEmail(recipient, campaign.subject, campaign.content);
        campaign.deliveryStatus.push({ email: recipient, status: status.success ? "Success" : "Failed" });
      }
      campaign.sent = true; // Mark campaign as sent
      await campaign.save();
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
