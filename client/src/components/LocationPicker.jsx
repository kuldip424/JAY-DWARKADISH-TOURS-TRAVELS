import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function LocationMarker({ position, setPosition, setAddress }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  const markerRef = useRef(null);
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latlng = marker.getLatLng();
          setPosition(latlng);
          fetchAddress(latlng.lat, latlng.lng);
        }
      },
    }),
    [setPosition]
  );

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found');
      }
    } catch (err) {
      console.error(err);
      setAddress('Error getting address');
    }
  };

  return position === null ? null : (
    <Marker 
      position={position} 
      draggable={true} 
      eventHandlers={eventHandlers} 
      ref={markerRef}
    />
  );
}

const LocationPicker = ({ isOpen, onClose, onSelect }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Default to somewhere near Dwarka, Gujarat
  const defaultPosition = { lat: 22.2394, lng: 68.9676 };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const newPos = { lat, lng };
        setPosition(newPos);
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress('Address not found');
          }
        } catch (err) {
          console.error(err);
          setAddress('Error getting address');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-stone-50">
          <h3 className="text-lg font-bold text-stone-800">Select Pickup Location</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <span className="iconify text-stone-500" data-icon="mdi:close"></span>
          </button>
        </div>
        
        <div className="p-4 flex gap-2">
          <button 
            onClick={handleUseMyLocation}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <span className={`iconify ${loading ? "animate-spin" : ""}`} data-icon={loading ? "mdi:loading" : "mdi:crosshairs-gps"}></span>
            {loading ? "Getting location..." : "Use My Location"}
          </button>
          
          <div className="flex-1 px-3 py-2 bg-stone-100 rounded-xl text-sm text-stone-700 truncate flex items-center">
            {address || "Click on the map or use your location"}
          </div>
        </div>

        <div className="h-[60vh] w-full bg-stone-200 relative">
          <MapContainer 
            center={position || defaultPosition} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
          </MapContainer>
        </div>

        <div className="p-4 border-t bg-stone-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full font-semibold text-stone-600 hover:bg-stone-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (address) {
                onSelect(address);
                onClose();
              }
            }}
            disabled={!address}
            className="px-6 py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
