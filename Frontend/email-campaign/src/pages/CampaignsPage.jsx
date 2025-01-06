// src/pages/CampaignsPage.jsx
import React, { useState, useEffect } from 'react';
import CampaignEmailForm from "../components/CampaignEmailForm";
import CampaignPerformance from "../components/CampaignPerformance";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sendingStatus, setSendingStatus] = useState(null);

  useEffect(() => {
    // Simulate fetching campaigns from backend
    const fetchCampaigns = async () => {
      const response = await fetch('/api/campaigns'); // Replace with your backend API endpoint
      const data = await response.json();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCampaigns(filtered);
  };

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign); // Set the selected campaign when clicked
  };

  const handleSendEmails = async ({ emailSubject, emailBody, recipients }) => {
    setSendingStatus('Sending emails...');
    try {
      // Simulate email sending API request
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailSubject, emailBody, recipients }),
      });
      const result = await response.json();
      if (result.success) {
        setSendingStatus('Emails sent successfully!');
      } else {
        setSendingStatus('Failed to send emails.');
      }
    } catch (error) {
      setSendingStatus('An error occurred while sending emails.');
    }
  };

  return (
    <div className="campaigns-page p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">All Campaigns</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
        />
      </div>
      <div className="campaigns-list">
        {campaigns.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Campaign Name</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Emails Sent</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-t"
                  onClick={() => handleCampaignClick(campaign)} // Handle click to view campaign details
                >
                  <td className="p-4">{campaign.name}</td>
                  <td
                    className={`p-4 ${
                      campaign.status === 'Completed'
                        ? 'text-green-600'
                        : campaign.status === 'In Progress'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {campaign.status}
                  </td>
                  <td className="p-4">{campaign.emailsSent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No campaigns found.</p>
        )}
      </div>

      {/* Render CampaignPerformance for selected campaign */}
      {selectedCampaign && (
        <>
          <CampaignPerformance campaign={selectedCampaign} />
          <CampaignEmailForm onSendEmails={handleSendEmails} />
        </>
      )}

      {/* Display sending status */}
      {sendingStatus && <p>{sendingStatus}</p>}
    </div>
  );
};

export default CampaignsPage;
