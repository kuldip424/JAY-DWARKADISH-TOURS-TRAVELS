import { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/ui/useToast';
import { apiError, isUnauthorized } from '@/api/apiClient';
import { createBookingApi } from '@/api/bookingsApi';

// Saves a ride or package booking for the logged-in user.
export function useCreateBooking() {
  const { user, logout, setShowAuth } = useAuth();
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false); // disable the button while saving

  // Returns true when saved
  const createBooking = async (booking, successMessage) => {
    setSaving(true);
    try {
      await createBookingApi(booking, user.token);
      addToast(successMessage, 'success');
      return true;
    } catch (e) {
      if (isUnauthorized(e)) {
        logout();
        setShowAuth(true);
        addToast('Your session has expired. Please log in again.', 'error');
      } else {
        addToast(apiError(e, 'Failed to save booking'), 'error');
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { createBooking, saving };
}
