// src/components/CampaignEmailForm.jsx
import React, { useState } from 'react';

const CampaignEmailForm = ({ onSendEmails }) => {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [recipients, setRecipients] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Trigger email sending via the parent function
    onSendEmails({ emailSubject, emailBody, recipients: recipients.split(',') });

    // Reset form after submission
    setEmailSubject('');
    setEmailBody('');
    setRecipients('');
  };

  return (
    <div className="email-form-container bg-white p-8 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Compose Email for Campaign</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-lg font-medium mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-lg font-medium mb-2">Email Body</label>
          <textarea
            id="body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="recipients" className="block text-lg font-medium mb-2">Recipients (comma-separated emails)</label>
          <input
            type="text"
            id="recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 bg-blue-500 text-white rounded-md ${sending && 'opacity-50 cursor-not-allowed'}`}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send Emails'}
        </button>
      </form>
    </div>
  );
};

export default CampaignEmailForm;
