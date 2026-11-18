import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/ui/useToast';
import { apiError, isUnauthorized } from '@/api/apiClient';
import { listAllBookingsApi, updateBookingStatusApi } from '@/api/bookingsApi';
import { BOOKINGS_POLL_INTERVAL } from '@/config/app';

// Pending first, then newest first
const sortBookings = (list) =>
  [...list].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

const getStats = (list) => ({
  total: list.length,
  pending: list.filter((b) => b.status === 'pending').length,
  revenue: list
    .filter((b) => b.status === 'completed' || b.status === 'confirmed')
    .reduce((sum, b) => sum + b.fare.total, 0),
});

// All bookings for the admin panel, refreshed every 30s, plus status updates.
export function useAdminBookings() {
  const { adminUser, adminLogout } = useAuth();
  const { addToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const previousCount = useRef(0); // to spot new booking requests
  const token = adminUser?.token;

  // Expired or invalid admin login: log out, AdminRoute then shows the login form
  const handleError = useCallback(
    (e, fallback) => {
      if (isUnauthorized(e)) {
        adminLogout();
        addToast('Your session has expired. Please log in again.', 'error');
      } else {
        addToast(apiError(e, fallback), 'error');
      }
    },
    [adminLogout, addToast]
  );

  const fetchBookings = useCallback(async () => {
    if (!token) return; // AdminRoute shows the login form instead
    try {
      const sorted = sortBookings(await listAllBookingsApi(token));

      if (previousCount.current > 0 && sorted.length > previousCount.current) {
        addToast(`${sorted.length - previousCount.current} New booking request(s) received!`, 'info');
      }

      previousCount.current = sorted.length;
      setBookings(sorted);
    } catch (e) {
      // A failed refresh (e.g. network blip) just shows a message; the admin stays on the page
      handleError(e, 'Could not load bookings. Retrying shortly.');
    } finally {
      setLoading(false);
    }
  }, [token, addToast, handleError]);

  useEffect(() => {
    // State is only set after the request resolves (lint false positive for async)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
    const interval = setInterval(fetchBookings, BOOKINGS_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  const updateStatus = useCallback(
    async (id, status) => {
      try {
        await updateBookingStatusApi(id, status, token);
        addToast(`Booking ${status} successfully`, 'success');
        fetchBookings();
      } catch (e) {
        handleError(e, 'Update failed');
      }
    },
    [token, addToast, fetchBookings, handleError]
  );

  return { bookings, stats: getStats(bookings), loading, refetch: fetchBookings, updateStatus };
}
