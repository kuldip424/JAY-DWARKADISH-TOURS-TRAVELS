import Booking from '../../models/booking.model.js';

export const createBookingRecord = (data) => Booking.create(data);

export const findBookingsByUser = (userId) =>
  Booking.find({ user: userId }).sort('-createdAt').lean();

export const findAllBookingsWithUser = () =>
  Booking.find({}).populate('user', 'name email').sort('-createdAt').lean();

export const findBookingById = (id) => Booking.findById(id).lean();

export const updateBookingStatusById = (id, status) =>
  Booking.findByIdAndUpdate(id, { $set: { status } }, { returnDocument: 'after', runValidators: true }).lean();
