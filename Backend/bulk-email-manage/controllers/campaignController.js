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
  

  const getPerformanceData = async (req, res) => {
    const { campaignId } = req.params;
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  
      const performance = {
        emailsSent: campaign.recipients.length,
        delivered: Math.floor(campaign.recipients.length * 0.95),
        openRate: Math.floor(campaign.recipients.length * 0.7),
        clickRate: Math.floor(campaign.recipients.length * 0.3),
      };
  
      res.status(200).json(performance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching performance data" });
    }
  };
  
  
  
  module.exports = { createCampaign, getCampaigns, updateCampaign, deleteCampaign, getPerformanceData };
  