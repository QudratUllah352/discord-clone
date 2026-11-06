const API_BASE_URL = 'http://localhost:5000/api';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),

  // Servers
  getServers: () => request('/servers'),
  createServer: (body) => request('/servers', { method: 'POST', body: JSON.stringify(body) }),
  createChannel: (serverId, body) => request(`/servers/${serverId}/channels`, { method: 'POST', body: JSON.stringify(body) }),

  // Messages
  getMessages: (channelId) => request(`/messages/${channelId}`),
  sendMessage: (channelId, content) => request(`/messages/${channelId}`, { method: 'POST', body: JSON.stringify({ content }) }),
};
