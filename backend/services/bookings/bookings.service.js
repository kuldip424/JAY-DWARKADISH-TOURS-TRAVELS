import httpError from '../../utils/httpError.js';
import {
  CAR_CAPACITY,
  CAR_RATE_PER_KM,
  DRIVER_ALLOWANCE,
  MAX_TRIP_KM,
  PACKAGE_PRICES,
} from '../../config/pricing.js';
import {
  aggregateBookingStats,
  countBookings,
  createBookingRecord,
  findBookingById,
  findBookingsByUser,
  findBookingsPage,
  updateBookingStatusById,
} from '../../repositories/bookings/bookings.repository.js';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const ADMIN_PAGE_SIZE = 25; // bookings per page in the admin panel
const MAX_USER_BOOKINGS = 100; // newest kept for a customer's own dashboard
const EMPTY_STATS = { total: 0, pending: 0, revenue: 0, customers: 0 };

const isOwner = (booking, user) => String(booking.user) === user.id;

// Rejects more passengers than the chosen car can take
const checkCapacity = ({ carType, passengers }) => {
  const seats = CAR_CAPACITY[carType];
  if (!seats) throw httpError(400, 'Invalid car type');
  if (Number(passengers) > seats) {
    throw httpError(400, `${carType} capacity is limited to ${seats} passengers`);
  }
};

// Ride fare, worked out from the distance the client measured and our own rates
const rideFare = ({ distanceKm, carType, tMode }) => {
  const km = Number(distanceKm);
  if (!Number.isFinite(km) || km <= 0 || km > MAX_TRIP_KM) {
    throw httpError(400, 'Invalid trip distance');
  }

  const allowance = DRIVER_ALLOWANCE[tMode];
  if (!allowance) throw httpError(400, 'Invalid trip mode');

  const base = Math.round(km * CAR_RATE_PER_KM[carType]);
  return { base, allowance, total: base + allowance };
};

// Package fare, taken from our own price list
const packageFare = (packageName) => {
  const price = PACKAGE_PRICES[packageName];
  if (!price) throw httpError(400, 'Unknown package');
  return { total: price };
};

export const createBooking = async (user, { type, details, customerInfo }) => {
  if (!details || !customerInfo) throw httpError(400, 'Please provide all required fields');
  if (!['ride', 'package'].includes(type)) throw httpError(400, 'Invalid booking type');

  checkCapacity(details);
  // Any fare sent by the client is ignored: the price is worked out here.
  const fare = type === 'package' ? packageFare(details.packageName) : rideFare(details);

  return createBookingRecord({ user: user.id, type, details, customerInfo, fare });
};

export const listUserBookings = (user) => findBookingsByUser(user.id, MAX_USER_BOOKINGS);

// One page of bookings for the admin panel, plus totals for the whole collection
export const listAllBookings = async ({ status, page } = {}) => {
  const filter = STATUSES.includes(status) ? { status } : {};
  const currentPage = Math.max(Number(page) || 1, 1);

  const [bookings, matching, stats] = await Promise.all([
    findBookingsPage(filter, {
      skip: (currentPage - 1) * ADMIN_PAGE_SIZE,
      limit: ADMIN_PAGE_SIZE,
    }),
    countBookings(filter),
    aggregateBookingStats(),
  ]);

  return {
    bookings,
    page: currentPage,
    totalPages: Math.max(Math.ceil(matching / ADMIN_PAGE_SIZE), 1),
    stats: stats[0] || EMPTY_STATS,
  };
};

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
