import { useCallback, useRef, useState } from 'react';
import { reversePlaceApi } from '@/api/mapApi';

// Coordinates -> readable address, for the map location picker.
// `address` is only ever a real address; problems go to `message`.
export function useAddressLookup() {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const latest = useRef(0); // ignore answers to older clicks

  const lookupAddress = useCallback(async (lat, lon) => {
    const requestId = ++latest.current;
    setAddress('');
    setMessage('Finding address...');
    try {
      const data = await reversePlaceApi(lat, lon);
      if (requestId !== latest.current) return;
      if (data?.display_name) {
        setAddress(data.display_name);
        setMessage('');
      } else {
        setMessage('No address found here. Try another spot.');
      }
    } catch (err) {
      if (requestId !== latest.current) return;
      console.error(err);
      setMessage('Could not get the address. Please try again.');
    }
  }, []);

  return { address, message, lookupAddress };
}
