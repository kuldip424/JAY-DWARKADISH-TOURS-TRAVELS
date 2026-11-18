import { request } from './apiClient';

const BASE = '/api/bookings';

export const listMyBookingsApi = (token) => request(BASE, { token });

export const listAllBookingsApi = (token) => request(`${BASE}/admin/all`, { token });

export const createBookingApi = (booking, token) =>
  request(BASE, { method: 'POST', body: booking, token });

export const updateBookingStatusApi = (id, status, token) =>
  request(`${BASE}/${id}/status`, { method: 'PATCH', body: { status }, token });
