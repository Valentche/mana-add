import axios from 'axios';

// CORREÇÃO AQUI:
// Mudamos de 'http://localhost:5000/api' para '/api'
// Isso faz o navegador procurar a API no mesmo domínio do site.
const API_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const auth = {
  async me() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
  async updateMe(updates) {
    const { data } = await apiClient.patch('/auth/me', updates);
    return data;
  },
  async logout() {
    await apiClient.post('/auth/logout');
    window.location.href = '/';
  },
  async isAuthenticated() {
    try {
      await this.me();
      return true;
    } catch {
      return false;
    }
  }
};

const createEntityAPI = (endpoint) => ({
  async list(sort = '-createdAt', limit = 50) {
    const { data } = await apiClient.get(endpoint, {
      params: { sort, limit }
    });
    return data;
  },
  async filter(query, sort, limit) {
    const { data } = await apiClient.post(`${endpoint}/filter`, query, {
      params: { sort, limit }
    });
    return data;
  },
  async create(entityData) {
    const { data } = await apiClient.post(endpoint, entityData);
    return data;
  },
  async update(id, updates) {
    const { data } = await apiClient.patch(`${endpoint}/${id}`, updates);
    return data;
  },
  async delete(id) {
    await apiClient.delete(`${endpoint}/${id}`);
    return { success: true };
  }
});

export const client = {
  auth,
  entities: {
    Group: createEntityAPI('/groups'),
    Order: createEntityAPI('/orders'),
    OrderCard: createEntityAPI('/order-cards'),
    ChatMessage: createEntityAPI('/chat'),
    User: createEntityAPI('/users')
  }
};