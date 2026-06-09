import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import RoutesSection from './components/RoutesSection';
import Fleet from './components/Fleet';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modals from './components/Modals';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const [modalType, setModalType] = useState(null); // 'place', 'fare', 'pkg', 'all'
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [carSelection, setCarSelection] = useState('Sedan');
  const [preFill, setPreFill] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { showAuth, setShowAuth, isAdmin } = useAuth();

  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      // Reveal Intersection Observer
      const rObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach(el => rObs.observe(el));

      // Counter Intersection Observer
      let cDone = false;
      const cObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !cDone) {
            cDone = true;
            document.querySelectorAll('.counter-num').forEach(c => {
              const t = +c.dataset.target;
              const d = 2000;
              const s = performance.now();
              function u(n) {
                const p = Math.min((n - s) / d, 1);
                const e = 1 - Math.pow(1 - p, 3);
                const v = Math.floor(e * t);
                c.textContent = t >= 1000 ? (v / 1000).toFixed(p >= 1 ? 0 : 1) + 'K+' : v + '+';
                if (p < 1) requestAnimationFrame(u);
                else c.textContent = t >= 1000 ? (t / 1000) + 'K+' : t + '+';
              }
              requestAnimationFrame(u);
            });
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.counter-num').forEach(el => cObs.observe(el));

      return () => {
        rObs.disconnect();
        cObs.disconnect();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isPageAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="bg-stone-50 min-h-screen">
      {!isPageAdmin && (
        <Navbar 
          onLoginClick={() => setShowAuth(true)} 
          onDashboardClick={() => navigate('/dashboard')} 
        />
      )}

      <Routes>
        <Route path="/" element={
          <>
            <Hero 
              setModalType={setModalType} 
              setModalData={setModalData} 
              carSelection={carSelection} 
              setCarSelection={setCarSelection} 
              preFill={preFill}
              setPreFill={setPreFill}
            />
            <div className="bg-stone-900 py-4 border-y border-white/5 overflow-hidden">
              <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
                {Array(3).fill(['Verified Drivers', 'Transparent Pricing', 'Pilgrimage Experts', '24/7 Available', 'Sanitized Cabs', 'Free Cancellation']).flat().map((item, i) => (
                  <div key={i} className="text-stone-500 text-[13px] font-medium flex items-center gap-2 shrink-0">
                    <span className="iconify text-gold-500/60" data-icon={item === 'Transparent Pricing' ? 'mdi:cash-multiple' : item === 'Pilgrimage Experts' ? 'mdi:temple-hindu' : item === '24/7 Available' ? 'mdi:clock-outline' : item === 'Sanitized Cabs' ? 'mdi:sanitizer' : item === 'Free Cancellation' ? 'mdi:cancel' : 'mdi:shield-check'}></span>
                    {item}
                    <span className="text-stone-700 ml-2">✦</span>
                  </div>
                ))}
              </div>
            </div>
            <Packages setModalType={setModalType} setSelectedItem={setSelectedItem} setModalData={setModalData} />
            <div id="routes" style={{ scrollMarginTop: '80px' }}>
              <RoutesSection onRouteSelect={setPreFill} />
            </div>
            <div id="fleet" style={{ scrollMarginTop: '80px' }}>
              <Fleet setCarSelection={setCarSelection} />
            </div>
            <WhyUs />
            <Reviews />
            <CTA />
            <div id="contact" style={{ scrollMarginTop: '80px' }}>
              <Contact />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard closeDashboard={() => navigate('/')} />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          isAdmin ? (
            <AdminDashboard closeAdmin={() => navigate('/')} />
          ) : (
            <AdminLogin />
          )
        } />
      </Routes>
      
      <Modals 
        modalType={modalType} 
        setModalType={setModalType} 
        selectedItem={selectedItem}
        modalData={modalData}
      />

      {showAuth && <Auth closeAuth={() => setShowAuth(false)} />}

      {/* WhatsApp Float */}
      <a href="https://wa.me/917623862884?text=Hi%2C%20I%20want%20to%20book%20a%20Dwarka%20tour" target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-all duration-300" style={{ animation: 'pulse-ring 2.5s infinite' }}>
        <span className="iconify text-white text-[28px]" data-icon="mdi:whatsapp"></span>
      </a>
    </div>
  );
}

export default App;
