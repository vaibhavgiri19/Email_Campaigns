// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar w-64 bg-gray-800 text-white h-screen flex flex-col p-4">
      <div className="sidebar-header mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <div className="sidebar-content flex-grow">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="block text-white hover:text-gray-400 text-lg p-2 rounded-md transition-all"
            >
              Admin Panel
            </Link>
          </li>
          <li>
            <Link
              to="/campaigns"
              className="block text-white hover:text-gray-400 text-lg p-2 rounded-md transition-all"
            >
              View Campaigns
            </Link>
          </li>
          <li>
            <Link
              to="/create-campaign"
              className="block text-white hover:text-gray-400 text-lg p-2 rounded-md transition-all"
            >
              Create Campaign
            </Link>
          </li>
          <li>
            <Link
              to="/performance"
              className="block text-white hover:text-gray-400 text-lg p-2 rounded-md transition-all"
            >
              Performance Tracking
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
