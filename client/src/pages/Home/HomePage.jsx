import { useState } from 'react';
import Hero from '@/components/Booking/Hero';
import BookingModals from '@/components/Booking/BookingModals';
import TrustMarquee from '@/components/Home/TrustMarquee';
import Packages from '@/components/Home/Packages';
import RoutesSection from '@/components/Home/RoutesSection';
import Fleet from '@/components/Home/Fleet';
import WhyUs from '@/components/Home/WhyUs';
import Reviews from '@/components/Home/Reviews';
import Contact from '@/components/Home/Contact';
import CTA from '@/components/Common/CTA';
import Footer from '@/components/Layout/Footer';

export default function HomePage() {
  // Booking modal state, shared by Hero, Packages and BookingModals
  const [modalType, setModalType] = useState(null); // 'place' | 'fare' | 'pkg' | 'all'
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Booking form helpers: car chosen in Fleet, route chosen in RoutesSection
  const [carSelection, setCarSelection] = useState('Sedan');
  const [preFill, setPreFill] = useState(null);

  return (
    <>
      <Hero
        setModalType={setModalType}
        setModalData={setModalData}
        carSelection={carSelection}
        setCarSelection={setCarSelection}
        preFill={preFill}
        setPreFill={setPreFill}
      />
      <TrustMarquee />
      <Packages setModalType={setModalType} setSelectedItem={setSelectedItem} setModalData={setModalData} />
      <RoutesSection onRouteSelect={setPreFill} />
      <Fleet setCarSelection={setCarSelection} />
      <WhyUs />
      <Reviews />
      <CTA />
      <Contact />
      <Footer />

      <BookingModals
        modalType={modalType}
        setModalType={setModalType}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        modalData={modalData}
      />
    </>
  );
}
