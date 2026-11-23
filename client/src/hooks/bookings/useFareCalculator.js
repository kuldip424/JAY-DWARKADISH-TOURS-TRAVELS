import { useState } from 'react';
import toast from 'react-hot-toast';
import { searchPlaceApi, getDrivingRouteApi } from '@/api/mapApi';
import { CAR_RATE_PER_KM, DRIVER_ALLOWANCE, LOCAL_TRIP_KM } from '@/config/booking';

// Address text -> { lat, lon }, or null
async function findPlace(address) {
  try {
    const data = await searchPlaceApi(address);
    return data?.length ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
  } catch (err) {
    console.error('Geocoding error:', err);
    return null;
  }
}

// Driving distance in km, or null
async function findDrivingKm(from, to) {
  try {
    const data = await getDrivingRouteApi(from, to);
    return data.code === 'Ok' && data.routes?.length ? data.routes[0].distance / 1000 : null;
  } catch (err) {
    console.error('Routing error:', err);
    return null;
  }
}

// Works out trip distance and fare for the ride booking form.
export function useFareCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);

  // Trip distance in km, or null if the route can't be found
  const getTripKm = async (from, to, tMode) => {
    const fromCoords = await findPlace(from);
    const toCoords = await findPlace(to);
    if (!fromCoords || !toCoords) {
      toast.error('Could not find these locations on the map. Please check them, or book on WhatsApp.');
      return null;
    }

    const routeKm = await findDrivingKm(fromCoords, toCoords);
    if (routeKm == null) {
      toast.error('Could not calculate the route. Please try again, or book on WhatsApp.');
      return null;
    }

    const km = Math.ceil(routeKm);
    return tMode === 'round' ? km * 2 : km;
  };

  // Returns { km, rate, base, allow, total }, or null if the distance is unknown
  const calculateFare = async ({ tripType, from, to, tMode, carType }) => {
    setIsCalculating(true);
    try {
      const km = tripType === 'local' ? LOCAL_TRIP_KM : await getTripKm(from, to, tMode);
      if (km == null) return null;
      const rate = CAR_RATE_PER_KM[carType] || CAR_RATE_PER_KM.Sedan;
      const base = km * rate;
      const allow = tMode === 'round' ? DRIVER_ALLOWANCE.round : DRIVER_ALLOWANCE.oneway;
      return { km, rate, base, allow, total: base + allow };
    } finally {
      setIsCalculating(false);
    }
  };

  return { calculateFare, isCalculating };
}
