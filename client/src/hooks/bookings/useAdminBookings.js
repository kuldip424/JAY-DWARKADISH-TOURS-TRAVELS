import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { apiError, isUnauthorized } from '@/api/apiClient';
import { listAllBookingsApi, updateBookingStatusApi } from '@/api/bookingsApi';
import { BOOKINGS_POLL_INTERVAL } from '@/config/app';

const EMPTY_STATS = { total: 0, pending: 0, revenue: 0, customers: 0 };

// One page of bookings for the admin panel, refreshed every 30s, plus status updates.
// The list is filtered, sorted, paged and counted by the server.
export function useAdminBookings(status) {
  const { adminUser, adminLogout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const previousPending = useRef(null); // to spot new booking requests
  const token = adminUser?.token;

  // Expired or invalid admin login: log out, AdminRoute then shows the login form
  const handleError = useCallback(
    (e, fallback) => {
      if (isUnauthorized(e)) {
        adminLogout();
        toast.error('Your session has expired. Please log in again.');
      } else {
        toast.error(apiError(e, fallback));
      }
    },
    [adminLogout]
  );

  const fetchBookings = useCallback(async () => {
    if (!token) return; // AdminRoute shows the login form instead
    try {
      const data = await listAllBookingsApi(token, { status, page });

      const pending = data.stats?.pending ?? 0;
      if (previousPending.current !== null && pending > previousPending.current) {
        toast(`${pending - previousPending.current} New booking request(s) received!`);
      }
      previousPending.current = pending;

      setBookings(data.bookings || []);
      setStats(data.stats || EMPTY_STATS);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      // A failed refresh (e.g. network blip) just shows a message; the admin stays on the page
      handleError(e, 'Could not load bookings. Retrying shortly.');
    } finally {
      setLoading(false);
    }
  }, [token, status, page, handleError]);

  useEffect(() => {
    // State is only set after the request resolves (lint false positive for async)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
    const interval = setInterval(fetchBookings, BOOKINGS_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  const updateStatus = useCallback(
    async (id, newStatus) => {
      try {
        await updateBookingStatusApi(id, newStatus, token);
        toast.success(`Booking ${newStatus} successfully`);
        fetchBookings();
      } catch (e) {
        handleError(e, 'Update failed');
      }
    },
    [token, fetchBookings, handleError]
  );

  return { bookings, stats, page, setPage, totalPages, loading, refetch: fetchBookings, updateStatus };
}
