// App-wide settings.
// To point at a different backend, set VITE_API_URL in client/.env
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://jay-dwarkadish-tours-travels-2.onrender.com';

// Business WhatsApp / phone number (country code, no "+")
export const WHATSAPP_NUMBER = '917623862884';
export const CALL_LINK = `tel:+${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = '+91 76238 62884';

// How often the dashboards refresh bookings (ms)
export const BOOKINGS_POLL_INTERVAL = 30000;
