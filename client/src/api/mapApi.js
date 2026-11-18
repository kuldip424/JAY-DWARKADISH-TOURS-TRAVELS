import { request } from './apiClient';

// Free map APIs: OpenStreetMap Nominatim (addresses) and OSRM (driving routes)
const NOMINATIM = 'https://nominatim.openstreetmap.org';
const OSRM = 'https://router.project-osrm.org';

export const searchPlaceApi = (query) =>
  request(`${NOMINATIM}/search?format=json&q=${encodeURIComponent(query)}`);

export const reversePlaceApi = (lat, lon) =>
  request(`${NOMINATIM}/reverse?format=json&lat=${lat}&lon=${lon}`);

// OSRM expects "longitude,latitude"
export const getDrivingRouteApi = (from, to) =>
  request(`${OSRM}/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`);
