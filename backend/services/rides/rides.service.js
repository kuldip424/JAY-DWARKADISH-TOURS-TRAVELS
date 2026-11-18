import httpError from '../../utils/httpError.js';
import {
  createRideRecord,
  findRideById,
  findRides,
  updateRideById,
} from '../../repositories/rides/rides.repository.js';

export const requestRide = (user, { pickup, destination, fare }) =>
  createRideRecord({ user: user.id, pickup, destination, fare });

// Drivers see open (pending) requests; everyone else sees their own rides
export const listRides = (user) =>
  findRides(user.role === 'driver' ? { status: 'pending' } : { user: user.id });

export const changeRideStatus = async (user, id, status) => {
  const ride = await findRideById(id);
  if (!ride) throw httpError(404, 'Ride not found');

  const update = { status };
  if (user.role === 'driver' && status === 'accepted') update.driver = user.id;
  return updateRideById(id, update);
};
