import { getWhatsAppLink } from '@/utils/whatsapp';

// Floating WhatsApp chat button (bottom-right on every page)
export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink('Hi, I want to book a Dwarka tour')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-all duration-300"
      style={{ animation: 'pulse-ring 2.5s infinite' }}
    >
      <span className="iconify text-white text-[28px]" data-icon="mdi:whatsapp"></span>
    </a>
  );
}
