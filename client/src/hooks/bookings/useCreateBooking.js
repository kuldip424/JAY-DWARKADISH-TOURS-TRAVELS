import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { apiError, isUnauthorized } from '@/api/apiClient';
import { createBookingApi } from '@/api/bookingsApi';

// Saves a ride or package booking for the logged-in user.
export function useCreateBooking() {
  const { user, logout, setShowAuth } = useAuth();
  const [saving, setSaving] = useState(false); // disable the button while saving

  // Returns true when saved
  const createBooking = async (booking, successMessage) => {
    setSaving(true);
    try {
      await createBookingApi(booking, user.token);
      toast.success(successMessage);
      return true;
    } catch (e) {
      if (isUnauthorized(e)) {
        logout();
        setShowAuth(true);
        toast.error('Your session has expired. Please log in again.');
      } else {
        toast.error(apiError(e, 'Failed to save booking'));
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { createBooking, saving };
}
