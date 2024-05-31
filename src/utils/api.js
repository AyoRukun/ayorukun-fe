import axios from 'axios';

const BASE_URL = 'https://backend.ayorukun.site';

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const checkToken = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/check`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
