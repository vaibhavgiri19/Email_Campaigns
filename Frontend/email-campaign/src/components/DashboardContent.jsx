import React from 'react';

const DashboardContent = () => {
  return (
    <div className="dashboard-content p-8">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Total Campaigns</h3>
          <p className="text-4xl font-bold mt-2">25</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Emails Sent</h3>
          <p className="text-4xl font-bold mt-2">1,245</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Open Rate</h3>
          <p className="text-4xl font-bold mt-2">45%</p>
        </div>
      </div>

      <div className="recent-campaigns mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Campaigns</h2>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Campaign Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Emails Sent</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">New Year Sale</td>
              <td className="p-4 text-green-600">Completed</td>
              <td className="p-4">500</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Black Friday Offer</td>
              <td className="p-4 text-yellow-600">In Progress</td>
              <td className="p-4">300</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">Holiday Campaign</td>
              <td className="p-4 text-red-600">Failed</td>
              <td className="p-4">200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardContent;
