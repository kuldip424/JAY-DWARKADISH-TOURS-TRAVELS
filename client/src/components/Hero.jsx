import React, { useState, useEffect } from 'react';
import heroBgImg from '../assets/hero-bg.png';
import { useToast } from '../context/ToastContext';
import LocationPicker from './LocationPicker';

const Hero = ({ setModalType, setModalData, carSelection, setCarSelection, preFill, setPreFill }) => {
  const { addToast } = useToast();
  const [tripType, setTripType] = useState('outstation');
  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tMode, setTMode] = useState('oneway');
  const [passengers, setPassengers] = useState(1);
  const [isPreFilling, setIsPreFilling] = useState(false);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (preFill) {
      console.log('Hero: Pre-filling route', preFill);
      setIsPreFilling(true);
      setFromLoc(preFill.f);
      setToLoc(preFill.t);
      setPreFill(null);
      
      // Better scroll handling with offset
      setTimeout(() => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      setTimeout(() => setIsPreFilling(false), 2000);
    }
  }, [preFill]);

  const swapLoc = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      }
      return null;
    } catch (err) {
      console.error('Geocoding error:', err);
      return null;
    }
  };

  const getDrivingDistance = async (fromCoords, toCoords) => {
    try {
      // OSRM expects: longitude,latitude
      const url = `https://router.project-osrm.org/route/v1/driving/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=false`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        // Distance is returned in meters
        return data.routes[0].distance / 1000;
      }
      return null;
    } catch (err) {
      console.error('Routing error:', err);
      return null;
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    const maxPax = { Sedan: 4, SUV: 6, Tempo: 12 };
    if (passengers > maxPax[carSelection]) {
      addToast(`${carSelection} capacity is limited to ${maxPax[carSelection]} passengers.`, 'error');
      return;
    }

    setIsCalculating(true);
    let km = 50; // Default fallback for local
    
    if (tripType !== 'local') {
      const fromCoords = await geocodeAddress(fromLoc);
      const toCoords = await geocodeAddress(toLoc);
      
      if (fromCoords && toCoords) {
        const routeKm = await getDrivingDistance(fromCoords, toCoords);
        if (routeKm) {
          km = Math.ceil(routeKm);
          if (tMode === 'round') {
            km = km * 2; // Multiply by 2 for round trip
          }
        } else {
          addToast('Could not calculate exact route, using estimate.', 'warning');
          km = Math.floor(Math.random() * 300) + 100;
        }
      } else {
        addToast('Could not find locations on map, using estimate.', 'warning');
        km = Math.floor(Math.random() * 300) + 100;
      }
    }

    const rates = { Sedan: 11, SUV: 15, Tempo: 22 };
    const rate = rates[carSelection] || 11;
    const base = km * rate;
    const allow = tMode === 'round' ? 500 : 250;
    const total = base + allow;

    setModalData({
      from: fromLoc,
      to: toLoc || 'Local',
      date,
      time,
      tMode,
      name,
      phone,
      km,
      rate,
      base,
      allow,
      total,
      carType: carSelection,
      passengers
    });
    setModalType('fare');
    setIsCalculating(false);
  };

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero-bg min-h-screen flex items-center relative" style={{ 
      backgroundImage: `linear-gradient(to right, rgba(15, 14, 12, 0.95) 0%, rgba(15, 14, 12, 0.7) 50%, rgba(15, 14, 12, 0.4) 100%), url(${heroBgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="hero-mesh"></div>
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-gold-500/[0.04] rounded-full blur-3xl anim-float-slow"></div>
      <div className="absolute bottom-1/4 right-[15%] w-96 h-96 bg-gold-400/[0.03] rounded-full blur-3xl anim-float-slow" style={{ animationDelay: '-3s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gold-400 rounded-full anim-float opacity-60" style={{ animationDelay: '-1s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-gold-300 rounded-full anim-float opacity-40" style={{ animationDelay: '-2.5s' }}></div>
      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-gold-500 rounded-full anim-float opacity-50" style={{ animationDelay: '-4s' }}></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 pb-20 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-16 xl:gap-24 items-center">
          {/* Left */}
          <div className="anim-fade-up">
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 mb-8">
              <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span></span>
              <span className="text-[13px] text-stone-300 font-medium">Dwarka's #1 Cab Service • Available 24/7</span>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Visit <span className="gold-text font-serif italic">Dwarka</span>,<br/>The Sacred City
            </h1>

            <p className="text-lg text-stone-400 leading-relaxed max-w-xl mb-8">
              Complete Dwarka tour packages covering Dwarkadhish Mandir, Bet Dwarka, Nageshwar Jyotirling, Shivrajpur Beach & more. Trusted by 15,000+ pilgrims.
            </p>

            {/* Place pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="glass text-[11px] font-medium px-3.5 py-1.5 rounded-full text-stone-300 flex items-center gap-1.5"><span>🕌</span>Dwarka Mandir</span>
              <span className="glass text-[11px] font-medium px-3.5 py-1.5 rounded-full text-stone-300 flex items-center gap-1.5"><span>🚢</span>Bet Dwarka</span>
              <span className="glass text-[11px] font-medium px-3.5 py-1.5 rounded-full text-stone-300 flex items-center gap-1.5"><span>🕉️</span>Nageshwar</span>
              <span className="glass text-[11px] font-medium px-3.5 py-1.5 rounded-full text-stone-300 flex items-center gap-1.5"><span>🏖️</span>Shivrajpur</span>
              <span className="glass text-[11px] font-medium px-3.5 py-1.5 rounded-full text-stone-300 flex items-center gap-1.5"><span>🌅</span>Gomti Ghat</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <button onClick={() => scrollTo('#packages')} className="btn-gold text-[15px] font-semibold px-9 py-4 rounded-full flex items-center gap-2.5" style={{ animation: 'pulse-ring 2.5s infinite' }}>
                <span className="iconify text-lg" data-icon="mdi:map-marker-path"></span>Explore Packages
              </button>
              <a href="https://wa.me/917623862884" target="_blank" className="glass text-white text-[15px] font-semibold px-9 py-4 rounded-full hover:bg-white/10 transition-all flex items-center gap-2.5">
                <span className="iconify text-lg text-green-400" data-icon="mdi:whatsapp"></span>WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 md:gap-12">
              <div><div className="text-4xl font-extrabold text-white counter-num" data-target="15000">0</div><div className="text-[13px] text-stone-500 mt-1">Happy Yatris</div></div>
              <div className="hidden md:block w-px bg-white/10"></div>
              <div><div className="text-4xl font-extrabold text-white counter-num" data-target="500">0</div><div className="text-[13px] text-stone-500 mt-1">5★ Reviews</div></div>
              <div className="hidden md:block w-px bg-white/10"></div>
              <div><div className="text-4xl font-extrabold text-white counter-num" data-target="8">0</div><div className="text-[13px] text-stone-500 mt-1">Tour Packages</div></div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div id="booking" className="reveal reveal-d3" style={{ scrollMarginTop: '120px' }}>
            <div className={`glass-light rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/10 border border-white/40 relative transition-all duration-500 ${isPreFilling ? 'scale-[1.02] ring-2 ring-gold-500/50 bg-gold-500/5' : ''}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
                    <span className="iconify text-white text-lg" data-icon="mdi:map-marker-path"></span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-stone-800">Quick Booking</h3>
                    <p className="text-[10px] text-stone-400">Instant fare estimate</p>
                  </div>
                </div>
                {isPreFilling ? (
                  <div className="px-2.5 py-1 rounded-md bg-gold-500 text-[10px] font-bold text-white uppercase tracking-tight animate-pulse flex items-center gap-1">
                    <div className="flex items-center" key="fill-icon">
                      <span className="iconify" data-icon="mdi:auto-fix"></span>
                    </div> 
                    Filling...
                  </div>
                ) : (
                  <div className="px-2.5 py-1 rounded-md bg-stone-100 text-[10px] font-bold text-stone-500 uppercase tracking-tight">Step 1 of 2</div>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-stone-100 rounded-full mb-6">
                <button onClick={() => setTripType('outstation')} className={`tab-pill text-[12px] font-semibold px-4 py-2 rounded-full flex-1 ${tripType === 'outstation' ? 'tab-active' : 'tab-inactive'}`}>Outstation</button>
                <button onClick={() => setTripType('airport')} className={`tab-pill text-[12px] font-semibold px-4 py-2 rounded-full flex-1 ${tripType === 'airport' ? 'tab-active' : 'tab-inactive'}`}>Airport</button>
                <button onClick={() => setTripType('local')} className={`tab-pill text-[12px] font-semibold px-4 py-2 rounded-full flex-1 ${tripType === 'local' ? 'tab-active' : 'tab-inactive'}`}>Local</button>
              </div>

              <form onSubmit={handleBook} className="space-y-3">
                <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-end gap-2">
                  <div className="w-full">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">From</label>
                    <div className="relative">
                      <span className="iconify absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 text-xs" data-icon="mdi:circle-medium"></span>
                      <input type="text" placeholder="Pickup city" required className="form-input w-full pl-8 pr-10 py-2.5 rounded-xl text-[13px]" value={fromLoc} onChange={e => setFromLoc(e.target.value)} />
                      <button 
                        type="button" 
                        onClick={() => setIsLocationPickerOpen(true)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-gold-600 transition-colors"
                        title="Choose on map"
                      >
                        <span className="iconify" data-icon="mdi:map-marker-radius"></span>
                      </button>
                    </div>
                  </div>
                  
                  <button type="button" onClick={swapLoc} className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-white transition-all text-stone-400 mb-1 mx-auto rotate-90 md:rotate-0">
                    <span className="iconify text-sm" data-icon="mdi:swap-horizontal"></span>
                  </button>

                  <div className="w-full">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">To</label>
                    <div className="relative">
                      <span className="iconify absolute left-3 top-1/2 -translate-y-1/2 text-red-400 text-xs" data-icon="mdi:map-marker"></span>
                      <input type="text" placeholder={tripType === 'local' ? 'Local Sightseeing' : 'Drop-off city'} required={tripType !== 'local'} disabled={tripType === 'local'} className="form-input w-full pl-8 pr-3 py-2.5 rounded-xl text-[13px] disabled:bg-stone-50 disabled:text-stone-400" value={tripType === 'local' ? 'Dwarka City' : toLoc} onChange={e => setToLoc(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Travel Date</label>
                    <input type="date" required className="form-input w-full px-4 py-2.5 rounded-xl text-[13px]" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Pickup Time</label>
                    <input type="time" required className="form-input w-full px-4 py-2.5 rounded-xl text-[13px]" value={time} onChange={e => setTime(e.target.value)} />
                  </div>
                </div>

                {tripType !== 'airport' && tripType !== 'local' && (
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 block">Trip Plan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-xl cursor-pointer has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/[0.04] transition-all">
                        <input type="radio" name="tmode" value="oneway" checked={tMode === 'oneway'} onChange={() => setTMode('oneway')} className="accent-[#C5A059] w-3 h-3"/>
                        <div className="text-[12px] font-bold text-stone-700">One Way</div>
                      </label>
                      <label className="flex items-center gap-2 px-3 py-2 border border-stone-200 rounded-xl cursor-pointer has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/[0.04] transition-all">
                        <input type="radio" name="tmode" value="round" checked={tMode === 'round'} onChange={() => setTMode('round')} className="accent-[#C5A059] w-3 h-3"/>
                        <div className="text-[12px] font-bold text-stone-700">Round Trip</div>
                      </label>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Vehicle Selection</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Sedan', 'SUV', 'Tempo'].map(type => (
                        <button 
                          key={type} 
                          type="button" 
                          onClick={() => setCarSelection(type)} 
                          className={`vehicle-chip py-2.5 rounded-xl text-[11px] font-bold ${carSelection === type ? 'vehicle-chip-active' : 'vehicle-chip-inactive'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block mt-3 md:mt-0">Passengers</label>
                    <div className="relative">
                      <span className="iconify absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm" data-icon="mdi:account-group"></span>
                      <input type="number" min="1" max={carSelection === 'Sedan' ? 4 : carSelection === 'SUV' ? 6 : 12} required className="form-input w-full pl-9 pr-3 py-2.5 rounded-xl text-[13px]" value={passengers} onChange={e => setPassengers(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block mt-3 md:mt-0">Your Name</label>
                    <input type="text" placeholder="Name" required minLength="3" maxLength="50" pattern="[A-Za-z\s]+" title="Name must contain only letters and spaces" className="form-input w-full px-4 py-2.5 rounded-xl text-[13px]" value={name} onChange={(e) => {
                      const val = e.target.value;
                      if (/^[a-zA-Z\s]*$/.test(val) && val.length <= 50) setName(val);
                    }} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block mt-3 md:mt-0">Phone Number</label>
                    <input type="tel" placeholder="9876543210" required minLength="10" maxLength="10" pattern="[0-9]{10}" title="Phone number must be exactly 10 digits" className="form-input w-full px-4 py-2.5 rounded-xl text-[13px]" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
                  </div>
                </div>
                <button type="submit" disabled={isCalculating} className="w-full btn-gold text-[15px] font-semibold py-4 rounded-full mt-2 flex items-center justify-center gap-2 disabled:opacity-70">
                  {isCalculating ? (
                    <><span className="iconify text-lg animate-spin" data-icon="mdi:loading"></span> Calculating Fare...</>
                  ) : (
                    <><span className="iconify text-lg" data-icon="mdi:car-connected"></span> Get Fare & Book</>
                  )}
                </button>
                <p className="text-center text-[11px] text-stone-400">No advance payment • Free cancellation</p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade-in" style={{ animationDelay: '2s' }}>
        <span className="text-[10px] text-stone-600 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-9 border border-stone-600 rounded-full flex justify-center pt-2"><div className="w-1 h-1 bg-gold-400 rounded-full animate-bounce"></div></div>
      </div>

      <LocationPicker 
        isOpen={isLocationPickerOpen} 
        onClose={() => setIsLocationPickerOpen(false)} 
        onSelect={(address) => setFromLoc(address)} 
      />
    </section>
  );
};

export default Hero;
