import React from 'react';

const CampaignCard = ({ campaign, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-md text-white">
      <h3 className="text-lg font-bold">{campaign.title}</h3>
      <p>{campaign.description}</p>
      <p className="text-sm text-gray-400">Emails Sent: {campaign.emailsSent}</p>
      <div className="mt-4">
        <button onClick={() => onEdit(campaign)} className="bg-blue-500 px-4 py-2 mr-2 rounded-md">Edit</button>
        <button onClick={() => onDelete(campaign.id)} className="bg-red-500 px-4 py-2 rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default CampaignCard;
