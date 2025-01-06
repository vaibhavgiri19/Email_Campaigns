// src/components/CampaignPerformance.jsx
import React, { useEffect, useState } from 'react';

const CampaignPerformance = ({ campaign }) => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Ensure campaign data is available before trying to access properties
    if (campaign && campaign.emailSentDates) {
      setPerformanceData(campaign.emailSentDates); // Assuming emailSentDates is an array
    }
  }, [campaign]);

  // Display loading message if performance data is not available yet
  if (!performanceData) {
    return <p>Loading campaign performance data...</p>;
  }

  return (
    <div className="performance-data">
      <h3>Campaign Performance</h3>
      <ul>
        {performanceData.map((date, index) => (
          <li key={index}>
            {date}: Sent
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignPerformance;
