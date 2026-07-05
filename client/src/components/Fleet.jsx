import React from 'react';
import sedanImg from '../assets/sedan.png';
import ertigaImg from '../assets/ertiga.jpg';
import { useToast } from '../context/ToastContext';

const Fleet = ({ setCarSelection }) => {
  const { addToast } = useToast();
  const cars = [
    { name: 'Swift Dzire', price: 11, desc: 'Perfect for solo & couple travelers. AC Sedan with good luggage space.', img: sedanImg, popular: true, cap: 4, bag: 2 },
    { name: 'Innova / Ertiga', price: 15, desc: 'Ideal for families and groups. Comfortable 6+1 seater with AC.', img: ertigaImg, bestValue: true, cap: 6, bag: 3 },
    { name: 'Tempo Traveller', price: 22, desc: '12-16 seater — Large groups & pilgrimage tours.', img: 'https://picsum.photos/seed/tempo-traveller-luxury/600/400.jpg', cap: '12-16', bag: null }
  ];

  return (
    <section id="fleet" className="py-28 md:py-36 curve-top bg-stone-50 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center mb-5">Our Fleet</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-5">Choose Your <span className="gold-text font-serif italic">Ride</span></h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">Well-maintained, AC cabs to suit every budget and group size.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <div key={i} className={`fleet-card bg-white rounded-[24px] overflow-hidden border border-stone-200/50 shadow-sm reveal reveal-d${i + 1}`}>
              <div className="relative h-52 overflow-hidden">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                {car.popular && <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">Popular</div>}
                {car.bestValue && <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">Best Value</div>}
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-stone-900">{car.name}</h3>
                  <div className="flex items-center gap-2 text-[12px] text-stone-400">
                    <span className="iconify" data-icon={car.bag === null ? "mdi:account-group" : "mdi:account"}></span>{car.cap}
                    {car.bag !== null && <><span className="iconify ml-1" data-icon="mdi:bag-suitcase"></span>{car.bag}</>}
                  </div>
                </div>
                <p className="text-[13px] text-stone-500 leading-relaxed mb-6">{car.desc}</p>
                <div className="flex items-end justify-between pt-5 border-t border-stone-100">
                  <div><span className="text-3xl font-extrabold text-stone-900">₹{car.price}</span><span className="text-[13px] text-stone-400 ml-1">/km</span></div>
                  <button onClick={() => {
                    const selection = car.name.includes('Dzire') ? 'Sedan' : car.name.includes('Tempo') ? 'Tempo' : 'SUV';
                    setCarSelection(selection);
                    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                    addToast(`${car.name} selected! Fill trip details.`, 'info');
                  }} className="btn-outline text-[13px] font-semibold px-6 py-2.5 rounded-full">Select</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
