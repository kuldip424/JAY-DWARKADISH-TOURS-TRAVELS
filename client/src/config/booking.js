// Booking rules shared by the ride form and the package modal.
export const CAR_TYPES = ['Sedan', 'SUV', 'Tempo'];

// Max passengers per car type
export const CAR_CAPACITY = { Sedan: 4, SUV: 6, Tempo: 12 };

// Fare per km (₹) per car type
export const CAR_RATE_PER_KM = { Sedan: 11, SUV: 15, Tempo: 22 };

// Driver allowance (₹) per trip mode
export const DRIVER_ALLOWANCE = { oneway: 250, round: 500 };

// Distance used for local trips (km)
export const LOCAL_TRIP_KM = 50;
