import axios from 'axios';

export const BASE_URL = 'https://backend.ayorukun.site';

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

export async function searchRegion(query) {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${BASE_URL}/region/province-regency?q=${query}`, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function createReport(reportData) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const formData = new FormData();

    reportData.report_files.forEach((file) => {
      formData.append('files', file);
    });

    formData.append('title', reportData.title);
    formData.append('content', reportData.content);
    formData.append('school_name', reportData.school_name);
    formData.append('case_date', reportData.case_date);
    formData.append('report_as', reportData.report_as);
    formData.append('region', reportData.region);

    const response = await axios.post(`${BASE_URL}/reports`, formData, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function createReportComment(reportId, commentData) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
        `${BASE_URL}/reports/${reportId}/comments`,
        commentData,
        { headers }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function getReportList() {
  try {
    const response = await axios.get(`${BASE_URL}/reports`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function getReportDetail(reportId) {
  try {
    const response = await axios.get(`${BASE_URL}/reports/${reportId}`)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function likeReport(reportId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/reports/${reportId}/like`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function unlikeReport(reportId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/reports/${reportId}/unlike`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function likeReportComment(reportId, commentId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/reports/${reportId}/comments/${commentId}/like`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function unlikeReportComment(reportId, commentId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/reports/${reportId}/comments/${commentId}/unlike`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function likeDiscussion(discussionId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/discussions/${discussionId}/like`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function unlikeDiscussion(discussionId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/discussions/${discussionId}/unlike`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function likeDiscussionComment(discussionId, commentId, userId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const data = {
      comment_id: commentId,
      user_id: userId
    };

    const response = await axios.post(`${BASE_URL}/discussions/${discussionId}/comments/${commentId}/like`, data, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}

export async function unlikeDiscussionComment(discussionId, commentId) {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/discussions/${discussionId}/comments/${commentId}/unlike`, {}, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
}
