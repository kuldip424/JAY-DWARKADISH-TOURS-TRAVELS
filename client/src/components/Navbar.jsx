import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, onDashboardClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-stone-50/92 backdrop-blur-lg shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 transition-transform duration-700 group-hover:rotate-[8deg] group-hover:scale-105">
                <span className="iconify text-white text-xl" data-icon="mdi:taxi-front"></span>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className={`text-lg font-extrabold tracking-tight leading-none ${isScrolled ? 'text-stone-800' : 'text-white'}`}>Dwarkesh</span>
                <span className="text-lg font-extrabold tracking-tight leading-none bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Cab</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              {['Tour', 'Packages', 'Routes', 'Fleet', 'Reviews', 'Contact'].map(item => (
                <a key={item} href={item === 'Tour' ? '/tour' : `/#${item.toLowerCase()}`} className={`text-[13px] font-medium hover:text-gold-500 transition-colors ${isScrolled ? 'text-stone-700' : 'text-white/80'}`}>{item}</a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {localStorage.getItem('user') ? (
                <div className="flex items-center gap-4">
                  <div className={`text-[13px] font-semibold flex items-center gap-1.5 ${isScrolled ? 'text-stone-700' : 'text-white'}`}>
                    <span className="iconify text-lg" data-icon="mdi:account-check"></span>
                    Hi, {JSON.parse(localStorage.getItem('user')).name.split(' ')[0]}
                  </div>
                  <button
                    onClick={onDashboardClick}
                    className={`text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 border rounded-full transition-all ${isScrolled ? 'text-gold-600 border-gold-200 hover:bg-gold-50' : 'text-white border-white/30 hover:bg-white/10'}`}
                  >
                    My Bookings
                  </button>
                  <button
                    onClick={() => { localStorage.removeItem('user'); window.location.reload(); }}
                    className={`text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 border rounded-full transition-all ${isScrolled ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-white border-white/30 hover:bg-white/10'}`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={onLoginClick} className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${isScrolled ? 'text-stone-700 hover:text-gold-600' : 'text-white/90 hover:text-white'}`}>
                  <span className="iconify text-lg" data-icon="mdi:account-circle-outline"></span>
                  Login
                </button>
              )}
              <div className="w-px h-4 bg-stone-300/30"></div>
              <a href="#booking" className="btn-gold text-[13px] font-semibold px-7 py-2.5 rounded-full flex items-center justify-center">Book Now</a>
            </div>

            <button onClick={toggleDrawer} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 transition-colors">
              <span className={`iconify text-2xl ${isScrolled ? 'text-stone-800' : 'text-white'}`} data-icon="mdi:menu"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleDrawer}></div>
      <div className={`fixed inset-y-0 right-0 w-[320px] max-w-[85vw] bg-stone-50 z-[120] shadow-2xl transition-transform duration-500 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <span className="text-lg font-bold text-stone-800">Menu</span>
            <button onClick={toggleDrawer} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-stone-100"><span className="iconify text-xl" data-icon="mdi:close"></span></button>
          </div>
          <nav className="flex flex-col gap-1">
            {['Tour', 'Packages', 'Routes', 'Fleet', 'Reviews', 'Contact'].map(item => (
              <a key={item} href={item === 'Tour' ? '/tour' : `/#${item.toLowerCase()}`} onClick={toggleDrawer} className="px-4 py-3.5 rounded-xl text-[15px] font-medium text-stone-700 hover:bg-gold-500/10 hover:text-gold-600 transition-all flex items-center gap-3">
                {item}
              </a>
            ))}
            {localStorage.getItem('user') && (
              <div className="space-y-1">
                <button onClick={() => { toggleDrawer(); onDashboardClick(); }} className="w-full text-left px-4 py-3.5 rounded-xl text-[15px] font-medium text-gold-600 bg-gold-500/5 hover:bg-gold-500/10 transition-all flex items-center gap-3">
                  <span className="iconify text-xl" data-icon="mdi:calendar-check"></span>
                  My Bookings
                </button>
              </div>
            )}
          </nav>

          <div className="mt-8 pt-8 border-t border-stone-200 space-y-3">
            <a href="#booking" onClick={toggleDrawer} className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white rounded-xl text-[14px] font-bold shadow-lg shadow-gold-500/20">
              <span className="iconify text-xl" data-icon="mdi:car-connected"></span>
              Book Now
            </a>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { toggleDrawer(); onLoginClick(); }} className="flex items-center justify-center gap-2 py-3.5 bg-stone-100 text-stone-800 rounded-xl text-[13px] font-bold hover:bg-stone-200 transition-colors">
                <span className="iconify text-lg" data-icon="mdi:account-circle-outline"></span>
                Login
              </button>
              <a href="tel:+917623862884" className="flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white rounded-xl text-[13px] font-bold hover:bg-stone-800 transition-colors">
                <span className="iconify text-gold-400 text-lg" data-icon="mdi:phone"></span>
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
