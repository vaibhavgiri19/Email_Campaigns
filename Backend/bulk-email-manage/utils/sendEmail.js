const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, content) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL, 
    subject,
    html: content, 
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;
