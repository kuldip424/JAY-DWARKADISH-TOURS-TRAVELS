// Money rules live on the server so a booking cannot be priced by the browser.
// The client shows the same numbers in client/src/config/booking.js and
// client/src/components/Home/Packages.jsx — change a price in both places.

export const CAR_RATE_PER_KM = { Sedan: 11, SUV: 15, Tempo: 22 }; // ₹ per km
export const CAR_CAPACITY = { Sedan: 4, SUV: 6, Tempo: 12 }; // max passengers
export const DRIVER_ALLOWANCE = { oneway: 250, round: 500 }; // ₹ per trip

// Longest trip we will quote for, to reject nonsense distances
export const MAX_TRIP_KM = 3000;

export const PACKAGE_PRICES = {
  'Dwarka Local Darshan': 2499,
  'Complete Dwarka Tour': 4499,
  'Dwarka + Somnath Yatra': 9999,
  'Dwarka Beach & Temple': 1999,
  'Nageshwar Jyotirling': 1799,
};
