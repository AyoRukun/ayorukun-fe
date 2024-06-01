import axios from 'axios';

const BASE_URL = 'https://backend.ayorukun.site';

export async function registerUser(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function checkToken() {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/auth/check`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function getDiscussionList() {
  try {
    const response = await axios.get(`${BASE_URL}/discussions`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function createDiscussion(discussionData) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(`${BASE_URL}/discussions`, discussionData, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function createDiscussionComment(discussionId, commentData) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
        `${BASE_URL}/discussions/${discussionId}/comments`,
        commentData,
        { headers }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function getDiscussionDetail(discussionId) {
  try {
    const response = await axios.get(`${BASE_URL}/discussions/${discussionId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}
