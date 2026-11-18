import Ride from '../../models/ride.model.js';

export const createRideRecord = (data) => Ride.create(data);

export const findRides = (filter) =>
  Ride.find(filter).populate('user', 'name phone').sort('-createdAt').lean();

export const findRideById = (id) => Ride.findById(id).lean();

export const updateRideById = (id, update) =>
  Ride.findByIdAndUpdate(id, { $set: update }, { returnDocument: 'after', runValidators: true }).lean();
