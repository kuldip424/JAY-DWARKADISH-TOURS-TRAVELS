import React from 'react';

const WhyUs = () => {
  const reasons = [
    { icon: 'mdi:currency-inr', title: 'No Hidden Charges', desc: 'What you see is what you pay. Transparent billing with no surprise fees.' },
    { icon: 'mdi:temple-hindu', title: 'Pilgrimage Experts', desc: 'Drivers who know temple timings, pooja schedules & local traditions.' },
    { icon: 'mdi:clock-check-outline', title: 'Always On Time', desc: '98% on-time pickup rate. We adjust for ferry timings at Bet Dwarka.' },
    { icon: 'mdi:shield-car', title: 'Safe & Sanitized', desc: 'Regularly sanitized cabs with first-aid kits for a safe journey.' },
    { icon: 'mdi:headset', title: '24/7 Support', desc: 'Round-the-clock support via call, WhatsApp, and chat.' },
    { icon: 'mdi:cancel', title: 'Free Cancellation', desc: 'Cancel for free up to 2 hours before pickup. No questions asked.' }
  ];

  return (
    <section className="py-28 md:py-36 hero-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center mb-5" style={{ color: '#E8D48B' }}>Why Dwarkesh Cab</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">The <span className="gold-text font-serif italic">Dwarkesh</span> Difference</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <div key={i} className="glass rounded-2xl p-8 hover:border-gold-500/30 transition-all duration-500 reveal reveal-d1">
              <span className="iconify text-gold-400 text-3xl mb-5 block" data-icon={r.icon}></span>
              <h3 className="text-[16px] font-bold text-white mb-2">{r.title}</h3>
              <p className="text-[13px] text-stone-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
