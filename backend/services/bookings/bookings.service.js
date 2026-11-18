import httpError from '../../utils/httpError.js';
import {
  createBookingRecord,
  findAllBookingsWithUser,
  findBookingById,
  findBookingsByUser,
  updateBookingStatusById,
} from '../../repositories/bookings/bookings.repository.js';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const isOwner = (booking, user) => String(booking.user) === user.id;

export const createBooking = async (user, { type, details, customerInfo, fare }) => {
  if (!details || !customerInfo || !fare) throw httpError(400, 'Please provide all required fields');
  return createBookingRecord({ user: user.id, type, details, customerInfo, fare });
};

export const listUserBookings = (user) => findBookingsByUser(user.id);

export const listAllBookings = () => findAllBookingsWithUser();

// Owners and admins can view a booking
export const getBooking = async (user, id) => {
  const booking = await findBookingById(id);
  if (!booking) throw httpError(404, 'Booking not found');
  if (!isOwner(booking, user) && user.role !== 'admin') throw httpError(403, 'Not authorized');
  return booking;
};

// Admins can set any status; a user can only cancel their own booking
export const changeBookingStatus = async (user, id, status) => {
  if (!STATUSES.includes(status)) throw httpError(400, 'Invalid status');

  const booking = await findBookingById(id);
  if (!booking) throw httpError(404, 'Booking not found');

  const ownerCancelling = status === 'cancelled' && isOwner(booking, user);
  if (!ownerCancelling && user.role !== 'admin') {
    throw httpError(403, 'Not authorized to perform this action');
  }
  return updateBookingStatusById(id, status);
};
