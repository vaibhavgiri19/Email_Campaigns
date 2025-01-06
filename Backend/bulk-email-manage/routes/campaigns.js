const express = require("express");
const { createCampaign, getCampaigns, updateCampaign, deleteCampaign } = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
const validateCampaign = require("../middleware/validateCampaign");
const Campaign = require("../models/Campaign");
const { getPerformanceData } = require("../controllers/campaignController");


const router = express.Router();

router.post("/", authMiddleware, createCampaign);
router.get("/", authMiddleware, getCampaigns);
router.put("/:id", authMiddleware, updateCampaign);
router.delete("/:id", authMiddleware, deleteCampaign);


router.get("/test-email", async (req, res) => {
    try {
      const response = await sendEmail("test@example.com", "Test Email", "<h1>Hello from SendGrid</h1>");
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/", validateCampaign, createCampaign);

  console.log("Campaign model:", Campaign);

  router.get("/performance/:campaignId", getPerformanceData);

  router.get('/campaigns', (req, res) => {
    const campaigns = [
      { id: 1, name: 'New Year Sale', status: 'Completed', emailsSent: 500 },
      { id: 2, name: 'Black Friday Offer', status: 'In Progress', emailsSent: 300 },
      { id: 3, name: 'Holiday Campaign', status: 'Failed', emailsSent: 200 },
    ];
    res.json(campaigns);
  });



module.exports = router;

