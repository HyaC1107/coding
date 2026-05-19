import axios from 'axios';
import { getAuth } from './auth';
import { io } from 'socket.io-client';

export const BASE_URL = 'http://10.0.2.2:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const socket = io(BASE_URL, {
  autoConnect: false,
});

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const auth = await getAuth();
    if (auth && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (url: string, params?: any) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (url: string, data?: any) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patch = async (url: string, data?: any) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postForm = async (url: string, formData: FormData) => {
  try {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
