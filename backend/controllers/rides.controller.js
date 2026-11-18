import { changeRideStatus, listRides, requestRide } from '../services/rides/rides.service.js';
import sendError from '../utils/sendError.js';

// POST /api/rides
export const postRide = async (req, res) => {
  try {
    const ride = await requestRide(req.user, req.body || {});
    res.status(201).json({ success: true, ride });
  } catch (e) {
    sendError(res, e);
  }
};

// GET /api/rides
export const getRides = async (req, res) => {
  try {
    const rides = await listRides(req.user);
    res.json({ success: true, rides });
  } catch (e) {
    sendError(res, e);
  }
};

// PUT /api/rides/:id
export const putRideStatus = async (req, res) => {
  try {
    const ride = await changeRideStatus(req.user, req.params.id, req.body?.status);
    res.json({ success: true, ride });
  } catch (e) {
    sendError(res, e);
  }
};
