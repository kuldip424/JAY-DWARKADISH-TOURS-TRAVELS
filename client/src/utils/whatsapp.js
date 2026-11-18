import { WHATSAPP_NUMBER } from '@/config/app';

/** Customer phone -> wa.me number: digits only, Indian 10-digit numbers get "91". */
export const toWhatsAppNumber = (phone = '') => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
};

/** wa.me chat link, optionally with a pre-filled message. */
export const getWhatsAppLink = (message, phone = WHATSAPP_NUMBER) =>
  `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
