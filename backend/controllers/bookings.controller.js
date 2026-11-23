import {
  changeBookingStatus,
  createBooking,
  getBooking,
  listAllBookings,
  listUserBookings,
} from '../services/bookings/bookings.service.js';

// POST /api/bookings
export const postBooking = async (req, res) => {
  const booking = await createBooking(req.user, req.body || {});
  res.status(201).json({ success: true, booking });
};

// GET /api/bookings
export const getMyBookings = async (req, res) => {
  const bookings = await listUserBookings(req.user);
  res.json({ success: true, bookings });
};

// GET /api/bookings/admin/all
export const getAllBookings = async (req, res) => {
  const { bookings, page, totalPages, stats } = await listAllBookings(req.query);
  res.json({ success: true, bookings, page, totalPages, stats });
};

// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  const booking = await getBooking(req.user, req.params.id);
  res.json({ success: true, booking });
};

// PATCH /api/bookings/:id/status
export const patchBookingStatus = async (req, res) => {
  const booking = await changeBookingStatus(req.user, req.params.id, req.body?.status);
  res.json({ success: true, booking });
};
