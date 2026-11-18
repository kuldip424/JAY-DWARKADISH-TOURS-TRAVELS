// Shared data shapes, written as JSDoc because the app is plain JavaScript.
// They give editor autocomplete only. Usage:
//   /** @param {import('@/types').Booking} booking */

/** @typedef {'Sedan' | 'SUV' | 'Tempo'} CarType */

/** @typedef {'pending' | 'confirmed' | 'completed' | 'cancelled'} BookingStatus */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {'user' | 'driver' | 'admin'} role
 * @property {string} token
 */

/**
 * @typedef {Object} Booking
 * @property {string} _id
 * @property {'ride' | 'package'} type
 * @property {BookingStatus} status
 * @property {{ packageName?: string, pickup?: string, destination?: string, date: string,
 *              time?: string, tMode?: string, carType?: CarType, passengers?: number }} details
 * @property {{ name: string, phone: string }} customerInfo
 * @property {{ total: number, base?: number, allowance?: number }} fare
 * @property {string} createdAt
 */

export {};
