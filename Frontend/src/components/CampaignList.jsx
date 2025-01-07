import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignList = ({ refresh }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/campaigns';
        const { data } = await axios.get(API_URL);
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error.message);
      }
    };
    fetchCampaigns();
  }, [refresh]);

  const sendCampaign = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/campaigns';
      await axios.post(`${API_URL}/send/${id}`);
      alert('Campaign emails sent successfully!');
      console.log('Fetched campaigns:', data); 

    } catch (error) {
      console.error('Error sending campaign:', error.message);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Campaign List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td className="border px-4 py-2">{campaign.name}</td>
              <td className="border px-4 py-2">{campaign.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => sendCampaign(campaign._id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Send Emails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;
