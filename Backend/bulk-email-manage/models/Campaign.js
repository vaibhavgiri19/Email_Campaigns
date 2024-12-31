const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  recipients: { type: [String], required: true },
  subject: { type: String, required: true },
  emailContent: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  status: { type: String, default: "scheduled" },
  createdAt: { type: Date, default: Date.now }
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
