import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-950 pt-20 pb-8 footer-wave relative mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="iconify text-white text-lg" data-icon="mdi:taxi-front"></span>
              </div>
              <div><span className="text-lg font-extrabold text-white">Dwarkesh</span><span className="text-lg font-extrabold text-gold-500">Cab</span></div>
            </div>
            <p className="text-[13px] text-stone-500 leading-relaxed">Your trusted partner for Dwarka pilgrimage tours & cab services across Gujarat.</p>
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-stone-400 mb-6">Packages</h4>
            <ul className="space-y-2.5">
              <li><a href="#packages" className="text-[13px] text-stone-500 hover:text-gold-500 transition-colors">Dwarka Local</a></li>
              <li><a href="#packages" className="text-[13px] text-stone-500 hover:text-gold-500 transition-colors">Complete Dwarka</a></li>
              <li><a href="#packages" className="text-[13px] text-stone-500 hover:text-gold-500 transition-colors">Dwarka + Somnath</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-stone-400 mb-6">Top Routes</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-[13px] text-stone-500 hover:text-gold-500 transition-colors">Ahmedabad → Dwarka</a></li>
              <li><a href="#" className="text-[13px] text-stone-500 hover:text-gold-500 transition-colors">Rajkot → Dwarka</a></li>
              <li><a href="#" className="text-[13px] text-stone-500 hover:text-gold-500 transition-colors">Jamnagar → Dwarka</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-stone-400 mb-6">Contact</h4>
            <ul className="space-y-2.5">
              <li className="text-[13px] text-stone-500 flex items-center gap-2"><span className="iconify text-gold-500/50" data-icon="mdi:phone"></span>+91 76238 62884</li>
              <li className="text-[13px] text-stone-500 flex items-center gap-2"><span className="iconify text-gold-500/50" data-icon="mdi:email-outline"></span>info@dwarkeshcab.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-stone-600">© 2025 Dwarkesh Cab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-stone-600 hover:text-gold-500 transition-colors">Privacy</a>
            <a href="#" className="text-[12px] text-stone-600 hover:text-gold-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
