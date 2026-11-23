import Booking from '../../models/booking.model.js';

export const createBookingRecord = (data) => Booking.create(data);

export const findBookingsByUser = (userId, limit) =>
  Booking.find({ user: userId }).sort('-createdAt').limit(limit).lean();

export const findBookingsPage = (filter, { skip, limit }) =>
  Booking.find(filter).populate('user', 'name email').sort('-createdAt').skip(skip).limit(limit).lean();

export const countBookings = (filter) => Booking.countDocuments(filter);

// Dashboard tiles in one pass over the collection, instead of loading every booking
export const aggregateBookingStats = () =>
  Booking.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
        revenue: {
          $sum: { $cond: [{ $in: ['$status', ['confirmed', 'completed']] }, '$fare.total', 0] },
        },
        customers: { $addToSet: '$user' },
      },
    },
    { $project: { _id: 0, total: 1, pending: 1, revenue: 1, customers: { $size: '$customers' } } },
  ]);

export const findBookingById = (id) => Booking.findById(id).lean();

export const updateBookingStatusById = (id, status) =>
  Booking.findByIdAndUpdate(id, { $set: { status } }, { returnDocument: 'after', runValidators: true }).lean();
