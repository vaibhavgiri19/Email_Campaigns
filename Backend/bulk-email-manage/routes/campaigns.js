const express = require("express");
const { createCampaign, getCampaigns, updateCampaign, deleteCampaign } = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
const validateCampaign = require("../middleware/validateCampaign");
const Campaign = require("../models/Campaign");

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


module.exports = router;

