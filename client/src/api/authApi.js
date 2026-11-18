import { request } from './apiClient';

const BASE = '/api/auth';

export const loginApi = (email, password) =>
  request(`${BASE}/login`, { method: 'POST', body: { email, password } });

export const registerApi = (data) =>
  request(`${BASE}/register`, { method: 'POST', body: data });
