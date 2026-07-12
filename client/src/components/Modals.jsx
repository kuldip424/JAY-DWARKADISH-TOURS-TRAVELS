import React, { useState } from 'react';
import dwarkaMandirImg from '../assets/dwarka-mandir.png';
import gomtiGhatImg from '../assets/gomti-ghat.png';
import nageshwarImg from '../assets/nageshwar.jpg';
import betDwarkaImg from '../assets/bet-dwarka.png';
import rukminiImg from '../assets/rukmini-temple.png';
import bhadkeshwarImg from '../assets/bhadkeshwar.png';
import shivrajpurImg from '../assets/shivrajpur.png';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const P = {
  'dwarka-mandir': { t: 'Dwarkadhish Mandir', s: 'The Main Temple of Dwarka', d: 'The Dwarkadhish Temple, also known as Jagat Mandir, is a 2500+ year old temple dedicated to Lord Krishna. The 5-storey structure stands on 72 pillars and features intricate carvings. One of the Char Dham pilgrimage sites.', img: dwarkaMandirImg, det: [{ i: 'mdi:clock-outline', l: 'Darshan Timings', v: '6:30 AM – 1:00 PM, 5:00 PM – 9:30 PM' }, { i: 'mdi:calendar-star', l: 'Best Time', v: 'Janmashtami (Aug/Sep)' }, { i: 'mdi:walk', l: 'From City Center', v: 'Walking distance' }] },
  'gomti-ghat': { t: 'Gomti Ghat', s: 'Sacred River Confluence', d: 'Gomti Ghat is where the sacred Gomti River meets the Arabian Sea. Pilgrims take a holy dip here before visiting the Dwarkadhish Temple. The evening aarti is a mesmerizing experience with hundreds of floating diyas.', img: gomtiGhatImg, det: [{ i: 'mdi:weather-sunset', l: 'Evening Aarti', v: 'Sunset (6:00 – 7:00 PM)' }, { i: 'mdi:swim', l: 'Holy Dip', v: 'Safe bathing ghats' }, { i: 'mdi:walk', l: 'From Mandir', v: '5 min walk' }] },
  'nageshwar': { t: 'Nageshwar Jyotirling', s: 'One of the 12 Jyotirlingas', d: 'Nageshwar is one of the 12 sacred Jyotirlinga shrines of Lord Shiva. Located 18 km from Dwarka on the route to Bet Dwarka. The temple features a massive 80-foot statue of Lord Shiva.', img: nageshwarImg, det: [{ i: 'mdi:clock-outline', l: 'Temple Timings', v: '6:00 AM – 9:00 PM' }, { i: 'mdi:car', l: 'From Dwarka', v: '18 km (30 min)' }, { i: 'mdi:star', l: 'Significance', v: 'One of 12 Jyotirlingas' }] },
  'bet-dwarka': { t: 'Bet Dwarka', s: 'Island of Lord Krishna', d: 'Bet Dwarka is an island in the Arabian Sea, believed to be the original residence of Lord Krishna. Accessible by the iconic Sudarshan Setu bridge or a short ferry ride from Okha. The island houses the Dwarkadhish Temple and beautiful beaches.', img: betDwarkaImg, det: [{ i: 'mdi:bridge', l: 'Access', v: 'Sudarshan Setu Bridge' }, { i: 'mdi:ferry', l: 'Ferry', v: 'Okha jetty – 15 min' }, { i: 'mdi:car', l: 'From Dwarka', v: '30 km to Okha (45 min)' }, { i: 'mdi:clock-outline', l: 'Best Time', v: 'Morning (before 11 AM)' }] },
  'gopi-talav': { t: 'Gopi Talav', s: 'Sacred Pond of the Gopis', d: 'Gopi Talav is a sacred pond about 20 km from Dwarka. According to legend, this is where Lord Krishna met the Gopis. The yellow sand (Gopi Chandan) is used for tilak by devotees.', img: 'https://picsum.photos/seed/gopi-talav-pond/600/300.jpg', det: [{ i: 'mdi:car', l: 'From Dwarka', v: '20 km (30 min)' }, { i: 'mdi:hand-pointing-right', l: 'Special', v: 'Gopi Chandan' }, { i: 'mdi:clock-outline', l: 'Duration', v: '30-45 min' }] },
  'rukhmani': { t: 'Rukhmaniji Mandir', s: 'Temple of Rukmini Devi', d: 'The Rukmini Temple is dedicated to Rukmini Devi, chief consort of Lord Krishna. Located 2 km from the Dwarkadhish Temple, this 2500-year-old temple features beautiful carvings and is one of the finest in Gujarat.', img: 'https://thrillingtravel.in/wp-content/uploads/2021/05/Dwarka-Rukmini-mandir.jpg', det: [{ i: 'mdi:car', l: 'From Mandir', v: '2 km (5 min)' }, { i: 'mdi:clock-outline', l: 'Timings', v: '6 AM–12 PM, 4–8 PM' }, { i: 'mdi:information', l: 'Note', v: 'Separate from main temple (ask why!)' }] },
  'bhadkeshwar': { t: 'Bhadkeshwar Mahadev', s: 'Seaside Shiva Temple', d: 'Bhadkeshwar Mahadev Temple is on a hillock near the seashore, offering stunning views of the Arabian Sea. During high tide, the temple becomes partially surrounded by water, creating a magical scene. Best visited during sunset.', img: bhadkeshwarImg, det: [{ i: 'mdi:walk', l: 'From Mandir', v: '1.5 km (walkable)' }, { i: 'mdi:weather-sunset', l: 'Best Time', v: 'Sunset' }, { i: 'mdi:waves', l: 'High Tide', v: 'Partially surrounded by sea' }] },
  'shivrajpur': { t: 'Shivrajpur Beach', s: 'Blue Flag Certified Beach', d: 'Shivrajpur Beach is one of India\'s Blue Flag certified beaches, known for pristine white sand and crystal clear water. Located 12 km from Dwarka, it\'s perfect for swimming and relaxing. A must-visit for beach lovers.', img: shivrajpurImg, det: [{ i: 'mdi:car', l: 'From Dwarka', v: '12 km (20 min)' }, { i: 'mdi:flag', l: 'Certification', v: 'Blue Flag (International)' }, { i: 'mdi:swim', l: 'Activities', v: 'Swimming, sunset' }, { i: 'mdi:clock-outline', l: 'Best Time', v: '4:00 PM – 6:30 PM' }] }
};

const Modals = ({ modalType, setModalType, selectedItem, modalData }) => {
  const { addToast } = useToast();
  const { setShowAuth, user } = useAuth();
  const [pkgName, setPkgName] = useState('');
  const [pkgPhone, setPkgPhone] = useState('');
  const [pkgDate, setPkgDate] = useState(new Date().toISOString().split('T')[0]);
  const [pkgCar, setPkgCar] = useState('Sedan');
  const [pkgPassengers, setPkgPassengers] = useState(1);
  const [pkgPickup, setPkgPickup] = useState('');

  if (!modalType) return null;

  const closeModal = () => setModalType(null);

  const confirmPkg = async () => {
    if (!pkgName || !pkgPhone || !pkgDate || !pkgPickup) {
      addToast('Please fill all fields', 'error');
      return;
    }

    const maxPax = { Sedan: 4, SUV: 6, Tempo: 12 };
    if (pkgPassengers > maxPax[pkgCar]) {
      addToast(`${pkgCar} capacity is limited to ${maxPax[pkgCar]} passengers.`, 'error');
      return;
    }

    if (!user || !user.token) {
      const msg = `Hi! Booking request:\n\n🕌 Package: ${modalData.title}\n📍 Pickup: ${pkgPickup}\n🚗 Car: ${pkgCar}\n👥 Passengers: ${pkgPassengers}\n💰 Price: ₹${modalData.price.toLocaleString()}\n📅 Date: ${pkgDate}\n👤 Name: ${pkgName}\n📱 Phone: ${pkgPhone}`;
      window.open(`https://wa.me/917623862884?text=${encodeURIComponent(msg)}`, '_blank');
      closeModal();
      addToast('Opening WhatsApp...', 'success');
      return;
    }

    try {
      // Save to Database
      const res = await fetch('https://jay-dwarkadish-tours-travels-1.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          type: 'package',
          details: {
            packageName: modalData.title,
            date: pkgDate,
            pickup: pkgPickup,
            carType: pkgCar,
            passengers: pkgPassengers
          },
          customerInfo: {
            name: pkgName,
            phone: pkgPhone
          },
          fare: {
            total: modalData.price
          }
        })
      });

      if (!res.ok) throw new Error('Failed to save booking');

      const msg = `Hi! Booking request:\n\n🕌 Package: ${modalData.title}\n📍 Pickup: ${pkgPickup}\n🚗 Car: ${pkgCar}\n👥 Passengers: ${pkgPassengers}\n💰 Price: ₹${modalData.price.toLocaleString()}\n📅 Date: ${pkgDate}\n👤 Name: ${pkgName}\n📱 Phone: ${pkgPhone}`;
      window.open(`https://wa.me/917623862884?text=${encodeURIComponent(msg)}`, '_blank');
      closeModal();
      addToast('Booking saved and WhatsApp initiated!', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleFareBooking = async () => {
    if (!user || !user.token) {
      window.open(getFareWaLink(), '_blank');
      closeModal();
      addToast('Opening WhatsApp...', 'success');
      return;
    }

    try {
      // Save to Database
      const res = await fetch('https://jay-dwarkadish-tours-travels-1.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          type: 'ride',
          details: {
            pickup: modalData.from,
            destination: modalData.to,
            date: modalData.date,
            time: modalData.time,
            tMode: modalData.tMode,
            carType: modalData.carType,
            passengers: modalData.passengers
          },
          customerInfo: {
            name: modalData.name,
            phone: modalData.phone
          },
          fare: {
            total: modalData.total,
            base: modalData.base,
            allowance: modalData.allow
          }
        })
      });

      if (!res.ok) throw new Error('Failed to save booking');

      window.open(getFareWaLink(), '_blank');
      closeModal();
      addToast('Ride booking saved!', 'success');
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const getFareWaLink = () => {
    if (!modalData) return "#";
    const msg = `Hi, I'd like to book:\n\n📍 From: ${modalData.from}\n📍 To: ${modalData.to}\n📅 Date: ${modalData.date}\n⏰ Time: ${modalData.time}\n🚗 Car: ${modalData.carType}\n👥 Passengers: ${modalData.passengers}\n🚗 Trip: ${modalData.tMode === 'round' ? 'Round' : 'One Way'}\n👤 Name: ${modalData.name}\n📱 Phone: ${modalData.phone}\n💰 Est: ₹${modalData.total.toLocaleString()}`;
    return `https://wa.me/917623862884?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>

      {/* PLACE MODAL */}
      {modalType === 'place' && selectedItem && P[selectedItem] && (
        <div className="relative bg-white rounded-[24px] max-w-lg w-full shadow-2xl overflow-hidden animate-slide-down z-10">
          <div className="h-64 relative bg-stone-900" style={{ backgroundImage: `url(${P[selectedItem].img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-5 left-6">
              <h3 className="text-2xl font-extrabold text-white font-serif">{P[selectedItem].t}</h3>
              <p className="text-[13px] text-stone-300 mt-1">{P[selectedItem].s}</p>
            </div>
            <button onClick={closeModal} className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all"><span className="iconify" data-icon="mdi:close"></span></button>
          </div>
          <div className="p-7">
            <p className="text-[14px] text-stone-600 leading-relaxed mb-6">{P[selectedItem].d}</p>
            <div className="mb-6">
              {P[selectedItem].det.map((d, i) => (
                <div key={i} className="detail-row flex items-start gap-3 py-2 border-b border-stone-100 last:border-0">
                  <span className="iconify text-gold-500 mt-0.5 flex-shrink-0" data-icon={d.i}></span>
                  <span className="text-[12px] text-stone-400 min-w-[90px]">{d.l}</span>
                  <span className="text-[13px] font-medium text-stone-800">{d.v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { closeModal(); setTimeout(() => document.querySelector('#package-list')?.scrollIntoView({ behavior: 'smooth' }), 300); }} className="w-full btn-gold text-[14px] font-semibold py-3.5 rounded-full flex items-center justify-center gap-2"><span className="iconify" data-icon="mdi:map-marker-path"></span>Book a Tour</button>
          </div>
        </div>
      )}

      {/* ALL PLACES MODAL */}
      {modalType === 'all' && (
        <div className="relative bg-white rounded-[24px] max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slide-down z-10 flex flex-col">
          <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-stone-100 p-6 flex items-center justify-between z-10 shrink-0">
            <div>
              <h3 className="text-xl font-extrabold text-stone-900 font-serif">All Places in Dwarka</h3>
              <p className="text-[12px] text-stone-400 mt-0.5">8+ sacred & scenic places</p>
            </div>
            <button onClick={closeModal} className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"><span className="iconify text-xl" data-icon="mdi:close"></span></button>
          </div>
          <div className="p-6 space-y-3 overflow-y-auto max-h-[calc(85vh-140px)]">
            {Object.entries(P).map(([k, p]) => (
              <div key={k} className="flex items-start gap-4 p-4 rounded-2xl border border-stone-200/60 hover:border-gold-400 hover:bg-gold-500/[0.02] transition-all cursor-pointer" onClick={() => { closeModal(); setTimeout(() => setModalType('place'), 300); }}>
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={p.img} alt={p.t} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-bold text-stone-800">{p.t}</h4>
                  <p className="text-[11px] text-stone-400 mb-1">{p.s}</p>
                  <p className="text-[12px] text-stone-500 line-clamp-2">{p.d.substring(0, 90)}…</p>
                </div>
                <span className="iconify text-stone-300 text-xl flex-shrink-0 mt-1" data-icon="mdi:chevron-right"></span>
              </div>
            ))}
          </div>
          <div className="p-6 pt-0">
            <button onClick={() => { closeModal(); setTimeout(() => document.querySelector('#package-list')?.scrollIntoView({ behavior: 'smooth' }), 300); }} className="w-full btn-gold text-[14px] font-semibold py-3.5 rounded-full flex items-center justify-center gap-2">
              <span className="iconify" data-icon="mdi:map-marker-path"></span>Book Complete Dwarka Tour
            </button>
          </div>
        </div>
      )}

      {/* FARE MODAL */}
      {modalType === 'fare' && modalData && (
        <div className="relative bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl animate-slide-down z-10">
          <button onClick={closeModal} className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"><span className="iconify text-stone-400" data-icon="mdi:close"></span></button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4"><span className="iconify text-emerald-500 text-3xl" data-icon="mdi:check-circle"></span></div>
            <h3 className="text-xl font-extrabold text-stone-900">Fare Estimate</h3>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[13px]"><span className="text-stone-400">Route</span><span className="font-semibold text-stone-800">{modalData.from} → {modalData.to}</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-stone-400">Date & Time</span><span className="font-semibold text-stone-800">{modalData.date}, {modalData.time}</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-stone-400">Car & Pax</span><span className="font-semibold text-stone-800">{modalData.carType} • {modalData.passengers} Pax</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-stone-400">Trip</span><span className="font-semibold text-stone-800">{modalData.tMode === 'round' ? 'Round Trip' : 'One Way'}</span></div>
            <hr className="border-stone-100" />
            <div className="flex justify-between text-[13px]"><span className="text-stone-400">Base ({modalData.km} km × ₹{modalData.rate})</span><span className="font-semibold text-stone-800">₹{modalData.base.toLocaleString()}</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-stone-400">Driver Allowance</span><span className="font-semibold text-stone-800">₹{modalData.allow}</span></div>
            <hr className="border-stone-100" />
            <div className="flex justify-between"><span className="font-semibold text-stone-800">Estimated Fare</span><span className="text-2xl font-extrabold text-gold-600">₹{modalData.total.toLocaleString()}</span></div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleFareBooking} className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-[13px] font-semibold py-3.5 rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2">
              <span className="iconify text-lg" data-icon="mdi:whatsapp"></span>WhatsApp
            </button>
            <a href="tel:+917623862884" className="flex-1 border border-stone-200 text-stone-800 text-[13px] font-semibold py-3.5 rounded-full hover:bg-stone-50 transition-all flex items-center justify-center gap-2"><span className="iconify" data-icon="mdi:phone"></span>Call</a>
          </div>
        </div>
      )}

      {/* PKG BOOK MODAL */}
      {modalType === 'pkg' && modalData && (
        <div className="relative bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl animate-slide-down z-10">
          <button onClick={closeModal} className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"><span className="iconify text-stone-400" data-icon="mdi:close"></span></button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-4"><span className="iconify text-gold-500 text-3xl" data-icon="mdi:temple-hindu"></span></div>
            <h3 className="text-xl font-extrabold text-stone-900">{modalData.title}</h3>
            <p className="text-[13px] text-stone-400 mt-1">Starting at <span className="font-bold text-gold-600">₹{modalData.price.toLocaleString()}</span></p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Name</label><input type="text" placeholder="Full name" className="form-input w-full px-4 py-3 rounded-xl text-sm" value={pkgName} onChange={e => setPkgName(e.target.value)} /></div>
              <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Phone</label><input type="tel" placeholder="+91 XXXXX" className="form-input w-full px-4 py-3 rounded-xl text-sm" value={pkgPhone} onChange={e => setPkgPhone(e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Date</label><input type="date" className="form-input w-full px-4 py-3 rounded-xl text-sm" value={pkgDate} onChange={e => setPkgDate(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
              <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Pickup Location</label><input type="text" placeholder="Hotel / Station" className="form-input w-full px-4 py-3 rounded-xl text-sm" value={pkgPickup} onChange={e => setPkgPickup(e.target.value)} /></div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Passengers</label><input type="number" min="1" max={pkgCar === 'Sedan' ? 4 : pkgCar === 'SUV' ? 6 : 12} className="form-input w-full px-4 py-3 rounded-xl text-sm" value={pkgPassengers} onChange={e => setPkgPassengers(e.target.value)} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Vehicle Selection</label>
              <div className="grid grid-cols-3 gap-2">
                {['Sedan', 'SUV', 'Tempo'].map(car => (
                  <button
                    key={car}
                    onClick={() => setPkgCar(car)}
                    className={`vehicle-chip py-2.5 rounded-xl text-[11px] font-bold ${pkgCar === car ? 'vehicle-chip-active' : 'vehicle-chip-inactive'}`}
                  >
                    {car === 'Tempo' ? 'Tempo' : car}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={confirmPkg} className="w-full btn-gold text-[15px] font-semibold py-4 rounded-full mt-6 flex items-center justify-center gap-2"><span className="iconify" data-icon="mdi:check"></span>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default Modals;
