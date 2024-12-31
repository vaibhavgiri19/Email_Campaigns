const Joi = require("joi");

const campaignSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  recipients: Joi.array().items(Joi.string().email()).required(),
  subject: Joi.string().required(),
  content: Joi.string().required(),
  scheduleAt: Joi.date().optional(),
});

const validateCampaign = (req, res, next) => {
  const { error } = campaignSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = validateCampaign;
