import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      <Sidebar />
      <div className="content ml-64 p-8 bg-gray-100 min-h-screen">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
