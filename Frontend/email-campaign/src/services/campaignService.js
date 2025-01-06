import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCampaigns = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${API_URL}/api/campaigns`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createCampaign = async (campaign) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/api/campaigns`, campaign, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
