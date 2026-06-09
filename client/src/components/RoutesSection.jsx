import React from 'react';

const RoutesSection = ({ onRouteSelect }) => {
  return (
    <section id="routes" className="py-28 md:py-36 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-start">
          <div className="reveal">
            <div className="section-label mb-5">Popular Routes</div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-5">Top Travel<br/><span className="gold-text font-serif italic">Routes</span></h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8">Most booked routes with best-in-class fares and reliable service.</p>
            <div className="flex items-center gap-4 text-[13px] text-stone-400">
              <span className="flex items-center gap-1.5"><span className="iconify text-gold-500" data-icon="mdi:shield-check"></span>Verified Drivers</span>
              <span className="flex items-center gap-1.5"><span className="iconify text-gold-500" data-icon="mdi:cash-multiple"></span>No Hidden Charges</span>
            </div>
          </div>
          <div className="space-y-3 reveal reveal-d2">
            {[
              { f: 'Ahmedabad', t: 'Dwarka', km: 465, hr: '8 hrs', pr: 4199, popular: true },
              { f: 'Rajkot', t: 'Dwarka', km: 225, hr: '4.5 hrs', pr: 2049 },
              { f: 'Jamnagar', t: 'Dwarka', km: 130, hr: '2.5 hrs', pr: 1199 },
              { f: 'Dwarka', t: 'Somnath', km: 230, hr: '5 hrs', pr: 2099, popular: true },
              { f: 'Vadodara', t: 'Dwarka', km: 530, hr: '9.5 hrs', pr: 4799 },
            ].map((r, i) => (
              <div 
                key={i} 
                onClick={(e) => { 
                  e.preventDefault();
                  console.log('Route clicked:', r.f, 'to', r.t);
                  onRouteSelect(r); 
                }} 
                className="route-item group flex items-center justify-between p-5 rounded-2xl border border-stone-200/60 bg-stone-50/50 cursor-pointer hover:bg-white hover:border-gold-300 hover:shadow-xl hover:shadow-gold-500/10 transition-all active:scale-[0.98]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[15px] font-bold text-stone-800">{r.f}</span>
                    <span className="iconify text-gold-500 text-sm" data-icon="mdi:arrow-right"></span>
                    <span className="text-[15px] font-bold text-stone-800">{r.t}</span>
                    {r.popular && <span className="text-[9px] font-bold bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">Popular</span>}
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-stone-400 font-medium">
                    <span className="flex items-center gap-1"><span className="iconify text-[14px]" data-icon="mdi:map-marker-distance"></span>{r.km} km</span>
                    <span className="flex items-center gap-1"><span className="iconify text-[14px]" data-icon="mdi:clock-outline"></span>{r.hr}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">Starts ₹{r.pr.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[12px] font-bold text-gold-600">Book Now</span>
                   <div className="w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-lg shadow-gold-500/20">
                     <span className="iconify text-lg" data-icon="mdi:chevron-right"></span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;
