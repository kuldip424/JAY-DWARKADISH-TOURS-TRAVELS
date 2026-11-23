import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { apiError, isUnauthorized } from '@/api/apiClient';
import { listMyBookingsApi, updateBookingStatusApi } from '@/api/bookingsApi';
import { BOOKINGS_POLL_INTERVAL } from '@/config/app';
import { shortBookingId } from '@/utils/format';

// The logged-in user's bookings, refreshed every 30s, plus cancel.
export function useMyBookings() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const previous = useRef([]); // last fetched list, to spot status changes
  const token = user?.token;

  const fetchBookings = useCallback(async () => {
    if (!token) return; // ProtectedRoute redirects logged-out users
    try {
      const data = (await listMyBookingsApi(token)).bookings || []; // { success, bookings }

      // Tell the user when the admin accepted or completed a booking
      data.forEach((b) => {
        const old = previous.current.find((p) => p._id === b._id);
        if (!old || old.status === b.status) return;
        if (b.status === 'confirmed') {
          toast.success(`Your booking #${shortBookingId(b._id)} has been ACCEPTED!`);
        } else if (b.status === 'completed') {
          toast(`Your trip #${shortBookingId(b._id)} is marked as completed. Thank you!`);
        }
      });

      previous.current = data;
      setBookings(data);
    } catch (e) {
      // Expired login: log out, ProtectedRoute then asks the user to log in again
      if (isUnauthorized(e)) logout();
      else toast.error(apiError(e, 'Failed to load bookings'));
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    // State is only set after the request resolves (lint false positive for async)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
    const interval = setInterval(fetchBookings, BOOKINGS_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  const cancelBooking = useCallback(
    async (id) => {
      try {
        await updateBookingStatusApi(id, 'cancelled', token);
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } catch (e) {
        if (isUnauthorized(e)) logout();
        else toast.error(apiError(e, 'Failed to cancel booking'));
      }
    },
    [token, fetchBookings, logout]
  );

  return { bookings, loading, cancelBooking };
}
