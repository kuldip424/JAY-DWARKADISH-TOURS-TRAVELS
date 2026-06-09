import React from 'react';
import mmtDwarkaImg from '../assets/dwarka-mandir.png';
import gomtiGhatImg from '../assets/gomti-ghat.png';
import localDarshanImg from '../assets/local-darshan.jpg';
import nageshwarImg from '../assets/nageshwar.jpg';
import betDwarkaImg from '../assets/bet-dwarka.png';
import rukminiImg from '../assets/rukmini-temple.png';
import bhadkeshwarImg from '../assets/bhadkeshwar.png';
import shivrajpurImg from '../assets/shivrajpur.png';
import beachImg from '../assets/beach.jpg';
import completeTourImg from '../assets/complete-tour.webp';
import somnathImg from '../assets/somnath.png';

const Packages = ({ setModalType, setSelectedItem, setModalData }) => {
  const bookPkg = (n, p) => {
    setModalData({ title: n, price: p });
    setModalType('pkg');
  };

  return (
    <section id="packages" className="py-28 md:py-36 bg-stone-50 relative overflow-hidden" style={{ scrollMarginTop: '80px' }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center mb-5">Dwarka Tour Packages</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 mb-5">
            Explore Sacred <span className="gold-text font-serif italic">Dwarka</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">City of Lord Krishna — Complete pilgrimage & sightseeing packages with AC cabs, professional drivers & guided tours.</p>
          <div className="ornament-divider mt-8"><div className="ornament-dot"></div></div>
        </div>

        {/* ====== DWARKA PLACES OVERVIEW ====== */}
        <div className="reveal mb-20">
          <div className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-stone-200/50">
            <div className="grid lg:grid-cols-5">
              {/* Image Side */}
              <div className="lg:col-span-2 relative min-h-[320px] lg:min-h-[460px]">
                <img src={mmtDwarkaImg} alt="Dwarka" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-3"><span className="iconify text-gold-400" data-icon="mdi:map-marker"></span><span className="text-[13px] font-medium text-gold-300">Gujarat, India</span></div>
                  <h3 className="text-3xl font-extrabold text-white font-serif mb-1">Dwarka</h3>
                  <p className="text-[14px] text-stone-300">City of Lord Krishna • One of the 4 Char Dhams</p>
                  <div className="flex items-center gap-4 mt-5 text-[12px] text-stone-400">
                    <span className="flex items-center gap-1"><span className="iconify text-gold-400" data-icon="mdi:clock-outline"></span>Oct–Mar</span>
                    <span className="flex items-center gap-1"><span className="iconify text-gold-400" data-icon="mdi:thermometer"></span>20–35°C</span>
                    <span className="flex items-center gap-1"><span className="iconify text-gold-400" data-icon="mdi:translate"></span>Gujarati</span>
                  </div>
                </div>
              </div>

              {/* Places Grid */}
              <div className="lg:col-span-3 p-8 lg:p-10">
                <div className="flex items-center justify-between mb-7">
                  <h4 className="text-[17px] font-bold text-stone-800 flex items-center gap-2"><span className="iconify text-gold-500 text-xl" data-icon="mdi:map-marker-multiple"></span>Top Places to Visit</h4>
                  <span className="text-[11px] font-bold text-gold-600 bg-gold-500/10 px-3 py-1.5 rounded-full">8+ Places</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
                  {[
                    { key: 'dwarka-mandir', icon: '🕌', name: 'Dwarka Mandir', sub: 'Dwarkadhish', bg: 'bg-orange-50', hoverBg: 'group-hover:bg-orange-100', img: mmtDwarkaImg },
                    { key: 'gomti-ghat', icon: '🌅', name: 'Gomti Ghat', sub: 'Sacred River', bg: 'bg-blue-50', hoverBg: 'group-hover:bg-blue-100', img: gomtiGhatImg },
                    { key: 'nageshwar', icon: '🕉️', name: 'Nageshwar', sub: 'Jyotirlinga', bg: 'bg-purple-50', hoverBg: 'group-hover:bg-purple-100', img: nageshwarImg },
                    { key: 'bet-dwarka', icon: '🚢', name: 'Bet Dwarka', sub: 'Island Temple', bg: 'bg-cyan-50', hoverBg: 'group-hover:bg-cyan-100', img: betDwarkaImg },
                    { key: 'gopi-talav', icon: '🪷', name: 'Gopi Talav', sub: 'Sacred Pond', bg: 'bg-green-50', hoverBg: 'group-hover:bg-green-100' },
                    { key: 'rukhmani', icon: '🛕', name: 'Rukhmaniji', sub: 'Mandir', bg: 'bg-pink-50', hoverBg: 'group-hover:bg-pink-100', img: 'https://thrillingtravel.in/wp-content/uploads/2021/05/Dwarka-Rukmini-mandir.jpg' },
                    { key: 'bhadkeshwar', icon: '🙏', name: 'Bhadkeshwar', sub: 'Shiva Temple', bg: 'bg-indigo-50', hoverBg: 'group-hover:bg-indigo-100', img: bhadkeshwarImg },
                    { key: 'shivrajpur', icon: '🏖️', name: 'Shivrajpur', sub: 'Blue Flag Beach', bg: 'bg-teal-50', hoverBg: 'group-hover:bg-teal-100', img: shivrajpurImg },
                  ].map(place => (
                    <div key={place.key} className="place-chip group flex items-center gap-3 px-4 py-3.5 border border-stone-200/80 rounded-2xl cursor-pointer bg-white hover:border-gold-400 hover:shadow-lg hover:shadow-gold-500/10" onClick={() => { setModalType('place'); setSelectedItem(place.key); }}>
                      <div className={`w-10 h-10 rounded-xl ${place.bg} flex items-center justify-center flex-shrink-0 overflow-hidden ${place.hoverBg} transition-colors`}>
                        {place.img ? (
                          <img src={place.img} alt={place.name} className="w-full h-full object-cover"/>
                        ) : (
                          <span className="text-lg">{place.icon}</span>
                        )}
                      </div>
                      <div><div className="text-[13px] font-semibold text-stone-800">{place.name}</div><div className="text-[11px] text-stone-400">{place.sub}</div></div>
                    </div>
                  ))}
                  <div className="place-chip group flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-dashed border-gold-400/40 rounded-2xl cursor-pointer bg-gold-500/[0.02] hover:border-gold-500 hover:bg-gold-500/[0.06] transition-all" onClick={() => setModalType('all')}>
                    <span className="iconify text-gold-500" data-icon="mdi:dots-horizontal-circle-outline"></span>
                    <span className="text-[13px] font-bold text-gold-600">VIEW MORE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====== PACKAGE CARDS ====== */}
        <div id="package-list" className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* PKG 1 */}
          <div className="pkg-card bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-200/50 reveal reveal-d1">
            <div className="relative h-56 overflow-hidden">
              <img src={localDarshanImg} alt="Dwarka Local" className="pkg-img w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-5 left-5"><span className="bg-gradient-to-r from-gold-400 to-gold-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-gold-500/30">BESTSELLER</span></div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-xl font-bold text-white mb-1">Dwarka Local Darshan</h3>
                <div className="flex items-center gap-2 text-[12px] text-stone-300"><span className="iconify" data-icon="mdi:clock-outline"></span>Full Day • 8-10 hrs</div>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 font-semibold">Dwarka Mandir</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold">Gomti Ghat</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 text-pink-700 font-semibold">Rukhmaniji</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold">Bhadkeshwar</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-semibold">Gopi Talav</span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-stone-400 mb-6">
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:car-side"></span>Swift Dzire / Innova</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:account-multiple"></span>Up to 6</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:camera"></span>Photo Stops</span>
              </div>
              <div className="flex items-end justify-between pt-5 border-t border-stone-100">
                <div><span className="text-[13px] text-stone-400 line-through mr-2">₹3,499</span><span className="text-2xl font-extrabold text-stone-900">₹2,499</span><span className="text-[13px] text-stone-400">/cab</span></div>
                <button onClick={() => bookPkg('Dwarka Local Darshan', 2499)} className="btn-gold text-[13px] font-semibold px-6 py-2.5 rounded-full">Book Now</button>
              </div>
            </div>
          </div>

          {/* PKG 2 */}
          <div className="pkg-card bg-white rounded-[24px] overflow-hidden shadow-sm border-2 border-gold-400/30 reveal reveal-d2 relative">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-gold-400 via-gold-300 to-gold-600 z-20"></div>
            <div className="relative h-56 overflow-hidden">
              <img src={completeTourImg} alt="Complete Dwarka" className="pkg-img w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-5 left-5"><span className="bg-gradient-to-r from-gold-400 to-gold-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-gold-500/30 flex items-center gap-1"><span className="iconify" data-icon="mdi:star"></span>MOST POPULAR</span></div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-xl font-bold text-white mb-1">Complete Dwarka Tour</h3>
                <div className="flex items-center gap-2 text-[12px] text-stone-300"><span className="iconify" data-icon="mdi:clock-outline"></span>Full Day • 10-12 hrs</div>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 font-semibold">Dwarka Mandir</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 font-semibold">Bet Dwarka</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold">Nageshwar</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold">Gomti Ghat</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-pink-50 text-pink-700 font-semibold">Rukhmaniji</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 font-semibold">Shivrajpur</span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-stone-400 mb-6">
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:car-side"></span>Swift Dzire / Innova</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:ferry"></span>Ferry Included</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:food"></span>Lunch Stop</span>
              </div>
              <div className="flex items-end justify-between pt-5 border-t border-gold-100">
                <div><span className="text-[13px] text-stone-400 line-through mr-2">₹5,999</span><span className="text-2xl font-extrabold text-stone-900">₹4,499</span><span className="text-[13px] text-stone-400">/cab</span></div>
                <button onClick={() => bookPkg('Complete Dwarka Tour', 4499)} className="btn-gold text-[13px] font-semibold px-6 py-2.5 rounded-full">Book Now</button>
              </div>
            </div>
          </div>

          {/* PKG 3 */}
          <div className="pkg-card bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-200/50 reveal reveal-d3">
            <div className="relative h-56 overflow-hidden">
              <img src={somnathImg} alt="Dwarka Somnath" className="pkg-img w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-5 left-5"><span className="bg-purple-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full">2 DAYS</span></div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-xl font-bold text-white mb-1">Dwarka + Somnath Yatra</h3>
                <div className="flex items-center gap-2 text-[12px] text-stone-300"><span className="iconify" data-icon="mdi:clock-outline"></span>2 Days 1 Night</div>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 font-semibold">Dwarka Mandir</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 font-semibold">Bet Dwarka</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold">Nageshwar</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold">Somnath</span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-stone-400 mb-6">
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:bed"></span>Stay Included</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:road-variant"></span>230 km</span>
              </div>
              <div className="flex items-end justify-between pt-5 border-t border-stone-100">
                <div><span className="text-[13px] text-stone-400 line-through mr-2">₹12,999</span><span className="text-2xl font-extrabold text-stone-900">₹9,999</span><span className="text-[13px] text-stone-400">/person</span></div>
                <button onClick={() => bookPkg('Dwarka + Somnath Yatra', 9999)} className="btn-gold text-[13px] font-semibold px-6 py-2.5 rounded-full">Book Now</button>
              </div>
            </div>
          </div>

          {/* PKG 4: Beach Tour */}
          <div className="pkg-card bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-200/50 reveal reveal-d1">
            <div className="relative h-56 overflow-hidden">
              <img src={beachImg} alt="Beach" className="pkg-img w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-5 left-5"><span className="bg-teal-500 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full">BEACH</span></div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-xl font-bold text-white mb-1">Dwarka Beach & Temple</h3>
                <div className="flex items-center gap-2 text-[12px] text-stone-300"><span className="iconify" data-icon="mdi:clock-outline"></span>Half Day • 5-6 hrs</div>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 font-semibold">Shivrajpur Beach</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 font-semibold">Dwarka Mandir</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold">Gomti Ghat</span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-stone-400 mb-6">
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:swim"></span>Beach Time</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:weather-sunset"></span>Sunset Point</span>
              </div>
              <div className="flex items-end justify-between pt-5 border-t border-stone-100">
                <div><span className="text-[13px] text-stone-400 line-through mr-2">₹2,999</span><span className="text-2xl font-extrabold text-stone-900">₹1,999</span><span className="text-[13px] text-stone-400">/cab</span></div>
                <button onClick={() => bookPkg('Dwarka Beach & Temple', 1999)} className="btn-gold text-[13px] font-semibold px-6 py-2.5 rounded-full">Book Now</button>
              </div>
            </div>
          </div>

          {/* PKG 5: Nageshwar */}
          <div className="pkg-card bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-200/50 reveal reveal-d2">
            <div className="relative h-56 overflow-hidden">
              <img src={nageshwarImg} alt="Nageshwar" className="pkg-img w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-5 left-5"><span className="bg-purple-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full">JYOTIRLING</span></div>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-xl font-bold text-white mb-1">Nageshwar Jyotirling</h3>
                <div className="flex items-center gap-2 text-[12px] text-stone-300"><span className="iconify" data-icon="mdi:clock-outline"></span>Half Day • 4-5 hrs</div>
              </div>
            </div>
            <div className="p-6 relative z-10">
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold">Nageshwar</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 font-semibold">Bet Dwarka</span>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-semibold">Gopi Talav</span>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-stone-400 mb-6">
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:ferry"></span>Ferry Included</span>
                <span className="flex items-center gap-1"><span className="iconify text-gold-500" data-icon="mdi:car-side"></span>AC Cab</span>
              </div>
              <div className="flex items-end justify-between pt-5 border-t border-stone-100">
                <div><span className="text-[13px] text-stone-400 line-through mr-2">₹2,499</span><span className="text-2xl font-extrabold text-stone-900">₹1,799</span><span className="text-[13px] text-stone-400">/cab</span></div>
                <button onClick={() => bookPkg('Nageshwar Jyotirling', 1799)} className="btn-gold text-[13px] font-semibold px-6 py-2.5 rounded-full">Book Now</button>
              </div>
            </div>
          </div>

          {/* PKG 6: Custom */}
          <div className="pkg-card rounded-[24px] overflow-hidden reveal reveal-d3 relative" style={{ background: 'linear-gradient(135deg,#1C1A16,#2C2A26)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(197,160,89,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-10 min-h-[420px]">
              <div className="w-20 h-20 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-7 anim-float-slow">
                <span className="iconify text-gold-400 text-4xl" data-icon="mdi:map-marker-plus-outline"></span>
              </div>
              <h3 className="text-2xl font-bold text-white font-serif mb-3">Custom Package</h3>
              <p className="text-[14px] text-stone-400 mb-7 max-w-xs leading-relaxed">Create your own itinerary. Pick your places, set your pace.</p>
              <div className="flex flex-wrap justify-center gap-2 mb-9">
                <span className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-stone-400">Any Place</span>
                <span className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-stone-400">Any Duration</span>
                <span className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-stone-400">Any Group</span>
              </div>
              <button onClick={() => document.querySelector('#contact')?.scrollIntoView({behavior: 'smooth'})} className="btn-outline text-[13px] font-semibold px-8 py-3 rounded-full border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-white">Get Custom Quote</button>
            </div>
          </div>
        </div>

        {/* All Places Summary */}
        <div className="mt-20 reveal">
          <div className="glass-gold rounded-[24px] p-8 lg:p-10 text-center">
            <h4 className="text-[17px] font-bold text-stone-800 mb-6 flex items-center justify-center gap-2"><span className="iconify text-gold-500 text-xl" data-icon="mdi:map-marker-multiple"></span>All Dwarka Places Covered</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🕌 Dwarka Mandir</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🌅 Gomti Ghat</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🕉️ Nageshwar</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🚢 Bet Dwarka</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🪷 Gopi Talav</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🛕 Rukhmaniji</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🙏 Bhadkeshwar</span>
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl text-[13px] font-medium text-stone-700 border border-stone-100 shadow-sm">🏖️ Shivrajpur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
