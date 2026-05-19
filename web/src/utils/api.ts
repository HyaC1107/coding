import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const get = (url: string, params?: any) => api.get(url, { params }).then(r => r.data);
export const post = (url: string, data?: any) => api.post(url, data).then(r => r.data);
export const patch = (url: string, data?: any) => api.patch(url, data).then(r => r.data);
export const postForm = (url: string, data: FormData) =>
  api.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);

export default api;
