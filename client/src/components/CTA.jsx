import React from 'react';

const CTA = () => {
  return (
    <section className="py-28 md:py-36 bg-stone-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="max-w-3xl mx-auto px-6 text-center relative reveal">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-5 py-2.5 mb-8">
          <span className="iconify text-gold-500" data-icon="mdi:offer"></span>
          <span className="text-[13px] font-semibold text-gold-600">10% Off on First Ride!</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-6 font-serif">
          Plan Your Dwarka<br/><span className="gold-text italic">Yatra Today</span>
        </h2>
        <p className="text-lg text-stone-500 mb-10 max-w-xl mx-auto">
          Book in 60 seconds. No advance payment, no hassle — just a blessed journey.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => { document.querySelector('#packages')?.scrollIntoView({behavior: 'smooth'}) }} className="btn-gold text-[15px] font-semibold px-10 py-4 rounded-full flex items-center gap-2">
            <span className="iconify" data-icon="mdi:temple-hindu"></span>View Packages
          </button>
          <a href="https://wa.me/917623862884" target="_blank" className="border-2 border-green-500 text-green-600 text-[15px] font-semibold px-10 py-4 rounded-full hover:bg-green-500 hover:text-white transition-all flex items-center gap-2">
            <span className="iconify text-lg" data-icon="mdi:whatsapp"></span>WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
