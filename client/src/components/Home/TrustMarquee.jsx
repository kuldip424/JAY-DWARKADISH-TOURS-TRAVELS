const ITEMS = [
  { label: 'Verified Drivers', icon: 'mdi:shield-check' },
  { label: 'Transparent Pricing', icon: 'mdi:cash-multiple' },
  { label: 'Pilgrimage Experts', icon: 'mdi:temple-hindu' },
  { label: '24/7 Available', icon: 'mdi:clock-outline' },
  { label: 'Sanitized Cabs', icon: 'mdi:sanitizer' },
  { label: 'Free Cancellation', icon: 'mdi:cancel' },
];

// Scrolling strip of trust badges below the hero.
// Items are repeated 3 times so the marquee loops without a gap.
export default function TrustMarquee() {
  const items = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="bg-stone-900 py-4 border-y border-white/5 overflow-hidden">
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="text-stone-500 text-[13px] font-medium flex items-center gap-2 shrink-0">
            <span className="iconify text-gold-500/60" data-icon={item.icon}></span>
            {item.label}
            <span className="text-stone-700 ml-2">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
