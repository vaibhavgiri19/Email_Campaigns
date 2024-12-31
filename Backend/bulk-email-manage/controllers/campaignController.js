const sendEmail = require("../utils/sendEmail");


  
  const getCampaigns = async (req, res) => {
    try {
      // Logic to fetch campaigns
      res.status(200).json({ campaigns: [] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCampaign = async (req, res) => {
    try {
      // Logic to update a campaign
      res.status(200).json({ message: "Campaign updated successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteCampaign = async (req, res) => {
    try {
      // Logic to delete a campaign
      res.status(200).json({ message: "Campaign deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createCampaign = async (req, res) => {
    try {
      const { name, description, recipients, subject, content, scheduleAt } = req.body;
  
      // Save campaign to DB
      const campaign = await Campaign.create({ name, description, recipients, subject, content, scheduleAt });
  
      // Send bulk emails immediately if no scheduleAt
      if (!scheduleAt) {
        for (const recipient of recipients) {
          const status = await sendEmail(recipient, subject, content);
          campaign.deliveryStatus.push({ email: recipient, status: status.success ? "Success" : "Failed" });
        }
        await campaign.save();
      }
  
      res.status(201).json({ message: "Campaign created successfully.", campaign });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  module.exports = { createCampaign, getCampaigns, updateCampaign, deleteCampaign };
  