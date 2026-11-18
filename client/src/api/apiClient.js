import { API_BASE_URL } from '@/config/app';

// NOTE: the code-structure skill uses axios here. This uses fetch until
// axios is installed; errors are shaped like axios errors (err.response.data)
// so hooks don't need to change when switching.

/**
 * Sends a request and returns the JSON body.
 * `path` is either an API path ('/api/bookings') or a full external URL.
 */
export async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(`Request failed with status ${res.status}`);
    err.response = { status: res.status, data };
    throw err;
  }
  return data;
}

// User-facing message from an API error.
// Network and server (5xx) errors show the fallback, never raw server internals.
export const apiError = (e, fallback = 'Something went wrong. Please try again.') => {
  const { status, data } = e?.response || {};
  if (!status || status >= 500) return fallback;
  return data?.message || data?.error || fallback;
};

// True when the login token is missing, expired or not allowed
export const isUnauthorized = (e) => e?.response?.status === 401;
