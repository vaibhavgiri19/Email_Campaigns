// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Fetching data for users and campaigns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/users'); // Replace with your backend endpoint
        const campaignsResponse = await axios.get('/api/campaigns'); // Replace with your backend endpoint
        setUsers(usersResponse.data);
        setCampaigns(campaignsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-page p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">User Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Manage Campaigns</h3>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Campaign Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Emails Sent</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t">
                <td className="p-4">{campaign.name}</td>
                <td className={`p-4 ${campaign.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{campaign.status}</td>
                <td className="p-4">{campaign.emailsSent}</td>
                <td className="p-4">
                  <Link to={`/admin/campaign/${campaign.id}`} className="text-blue-500 hover:underline">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

