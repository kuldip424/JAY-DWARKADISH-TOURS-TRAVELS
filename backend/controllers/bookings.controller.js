import {
  changeBookingStatus,
  createBooking,
  getBooking,
  listAllBookings,
  listUserBookings,
} from '../services/bookings/bookings.service.js';
import sendError from '../utils/sendError.js';

// POST /api/bookings
export const postBooking = async (req, res) => {
  try {
    const booking = await createBooking(req.user, req.body || {});
    res.status(201).json({ success: true, booking });
  } catch (e) {
    sendError(res, e);
  }
};

// GET /api/bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await listUserBookings(req.user);
    res.json({ success: true, bookings });
  } catch (e) {
    sendError(res, e);
  }
};

// GET /api/bookings/admin/all
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await listAllBookings();
    res.json({ success: true, bookings });
  } catch (e) {
    sendError(res, e);
  }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const booking = await getBooking(req.user, req.params.id);
    res.json({ success: true, booking });
  } catch (e) {
    sendError(res, e);
  }
};

// PATCH /api/bookings/:id/status
export const patchBookingStatus = async (req, res) => {
  try {
    const booking = await changeBookingStatus(req.user, req.params.id, req.body?.status);
    res.json({ success: true, booking });
  } catch (e) {
    sendError(res, e);
  }
};
