import { request } from './apiClient';

const BASE = '/api/bookings';

export const listMyBookingsApi = (token) => request(BASE, { token });

// One page of bookings, filtered by status ('all' means every status)
export const listAllBookingsApi = (token, { status, page }) =>
  request(`${BASE}/admin/all?status=${status}&page=${page}`, { token });

export const createBookingApi = (booking, token) =>
  request(BASE, { method: 'POST', body: booking, token });

export const updateBookingStatusApi = (id, status, token) =>
  request(`${BASE}/${id}/status`, { method: 'PATCH', body: { status }, token });
