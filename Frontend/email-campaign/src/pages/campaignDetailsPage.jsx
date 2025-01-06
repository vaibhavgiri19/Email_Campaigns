import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CampaignDetailsPage = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(`/api/campaigns/${campaignId}`);
        setCampaign(response.data);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    };
    fetchCampaignDetails();
  }, [campaignId]);

  if (!campaign) {
    return <p>Loading campaign details...</p>;
  }

  return (
    <div className="campaign-details p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{campaign.name}</h2>
      <p>Status: {campaign.status}</p>
      <p>Emails Sent: {campaign.emailsSent}</p>
    </div>
  );
};

export default CampaignDetailsPage;
