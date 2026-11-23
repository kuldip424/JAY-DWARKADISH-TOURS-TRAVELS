import axios from 'axios';
import { API_BASE_URL } from '@/config/app';

const api = axios.create({ baseURL: API_BASE_URL });

/**
 * Sends a request and returns the JSON body.
 * `path` is either an API path ('/api/bookings') or a full external URL.
 */
export const request = async (path, { method = 'GET', body, token } = {}) => {
  const { data } = await api.request({
    url: path,
    method,
    data: body,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
};

// User-facing message from an API error.
// Network and server (5xx) errors show the fallback, never raw server internals.
export const apiError = (e, fallback = 'Something went wrong. Please try again.') => {
  const { status, data } = e?.response || {};
  if (!status || status >= 500) return fallback;
  return data?.error || data?.message || fallback;
};

// True when the login token is missing, expired or not allowed
export const isUnauthorized = (e) => e?.response?.status === 401;
