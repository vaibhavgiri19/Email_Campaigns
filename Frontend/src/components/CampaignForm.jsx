import React, { useState } from 'react';

const CampaignForm = ({ onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    recipients: '',
    subject: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://email-campaigns-x70d.onrender.com/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Campaign created successfully!');
        onRefresh();
        setFormData({
          name: '',
          description: '',
          recipients: '',
          subject: '',
          content: '',
        });
      } else {
        alert('Error creating campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <form className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6 text-teal-400">Create Campaign</h2>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Recipients (comma-separated)</label>
        <textarea
          name="recipients"
          value={formData.recipients}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-white mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-white mb-2">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Create Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
