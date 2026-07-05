import React from 'react';
import Footer from './Footer';
import CTA from './CTA';
import somnathImg from '../assets/somnath.png';
import dwarkaImg from '../assets/dwarka-mandir.png';
import udaipurImg from '../assets/udaipur.png';
import jodhpurImg from '../assets/jodhpur.png';
import saputaraImg from '../assets/saputara.png';
import porbandarImg from '../assets/porbandar.png';
import junagadhImg from '../assets/junagadh.png';
import diuImg from '../assets/diu.png';
import souImg from '../assets/statue-of-unity.png';
import ahmedabadImg from '../assets/ahmedabad.png';

const tourData = {
  gujarat: [
    {
      title: 'Dwarka',
      subtitle: 'City in Gujarat',
      discount: '15% Off',
      places: ['Dwarka Mandir', 'Gomti Ghat', 'Nageshwar', 'Bet Dwarka', 'Gopi Tadav', 'Rukhmaniji Mandir', 'Bhadkeshwar', 'Shivrajpur Beach'],
      img: dwarkaImg,
      objectPosition: 'top'
    },
    {
      title: 'Somnath',
      subtitle: 'Prabhas Patan, Veraval in Gujarat',
      discount: '15% Off',
      places: ['Somnath mandir', 'Triveni Mahasangam', 'Bhalka Tirth', 'Pandav Gufa', 'Surya Mandir', 'Ram Mandir', 'Gita Mandir'],
      img: somnathImg
    },
    {
      title: 'Diu',
      subtitle: 'Town in Diu Island',
      discount: '15% Off',
      places: ['Diu Fort', 'Diu Museum', 'Saint Paul’s Church', 'Jalandhar Cave Theatre', 'Naida Caves', 'INS Khukri Memorial', 'Heritage Walk', 'Diu wall', 'Ghoghla Beach', 'Nagao Beach', 'Gangeshwar Mahadev'],
      img: diuImg
    },
    {
      title: 'Junagadh',
      subtitle: 'City in Gujarat',
      discount: '15% Off',
      places: ['Girnar Taleti', 'Damodar Kund', 'Uparkot Junagadh', 'Museum', 'Ashok Shilalekh'],
      img: junagadhImg
    },
    {
      title: 'Sasan Gir',
      subtitle: 'City in Gujarat',
      discount: '15% Off',
      places: ['Devaliya Safari', 'Gir National Park', 'Sasan Gir Museum'],
      img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Statue Of Unity',
      subtitle: 'Kevadia in Gujarat',
      discount: '15% Off',
      places: ['Sardar Sarovar Nauka Vihar', 'Pet zone', 'Jungle Safari', 'Valley of Flowers', 'Sardar Patel Zoological Park'],
      img: souImg
    },
    {
      title: 'Porbandar',
      subtitle: 'City in Gujarat',
      discount: '15% Off',
      places: ['Porbandar Beach', 'Kirti Mandir', 'Harsiddhi Mataji Temple', 'Porbandar Bird Sanctuary', 'Rangbai Beach', 'Ghumli'],
      img: porbandarImg
    },
    {
      title: 'Saputara',
      subtitle: 'Town in Gujarat',
      discount: '15% Off',
      places: ['Sunrise Point', 'sunset point', 'Saputara Hill station', 'Rose Garden', 'Pushpak Ropeway', 'Step Garden', 'Echo point Hill'],
      img: saputaraImg
    },
    {
      title: 'Ahmedabad',
      subtitle: 'Town in Gujarat',
      discount: '15% Off',
      places: ['Kankaria Lake', 'Sarkhej Roza', 'Science City', 'Adalaj Stepwell', 'Jama Masjid', 'Sabarmati Riverfront'],
      img: ahmedabadImg
    }
  ],
  rajasthan: [
    {
      title: 'Jaipur',
      subtitle: 'City in Rajasthan',
      discount: '15% Off',
      places: ['Hawa Mahal', 'Jantar Mantar', 'The City Palace', 'Amber Palace', 'Rambagh Palace', 'Jal Mahal', 'Nahargarh Fort'],
      img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Udaipur',
      subtitle: 'City in Rajasthan',
      discount: '15% Off',
      places: ['Saheliyon ki bari', 'Jagdish Temple', 'City Palace', 'Taj Lake Palace', 'Ahar Museum'],
      img: udaipurImg
    },
    {
      title: 'Jodhpur',
      subtitle: 'City in Rajasthan',
      discount: '15% Off',
      places: ['Mehrangarh Fort', 'Umaid Bhawan Palace', 'Jaswant Thada', 'Ghanta Ghar', 'Sardar Government Museum'],
      img: jodhpurImg
    }
  ]
};

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-stone-200/50 group flex flex-col">
      <div className="h-56 overflow-hidden relative bg-stone-100">
        <img src={tour.img} alt={tour.title} className="w-full h-full transition-transform duration-700 group-hover:scale-105" style={{ objectFit: tour.objectFit || 'cover', objectPosition: tour.objectPosition || 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-gold-500 text-stone-900 text-[12px] font-extrabold px-3 py-1.5 rounded-full shadow-lg">
            {tour.discount}
          </span>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-extrabold text-white mb-0.5">{tour.title}</h3>
          <div className="flex items-center gap-1.5 text-[12px] text-stone-300 font-medium">
            <span className="iconify text-gold-400" data-icon="mdi:map-marker"></span>
            {tour.subtitle}
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h4 className="text-[13px] font-bold text-stone-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="iconify text-gold-500 text-lg" data-icon="mdi:map-marker-path"></span>
          Places to Visit
        </h4>
        <div className="flex flex-wrap gap-2 mb-6 flex-1">
          {tour.places.map((place, idx) => (
            <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 border border-stone-200/60">
              {place}
            </span>
          ))}
        </div>
        <a href="#book-tour" className="w-full btn-gold text-[13px] font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 mt-auto">
          VIEW MORE <span className="iconify" data-icon="mdi:arrow-right"></span>
        </a>
      </div>
    </div>
  );
};

const Tours = () => {
  return (
    <div className="bg-stone-50 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative py-24 md:py-32 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/90 to-transparent z-10"></div>
        <img src="https://images.unsplash.com/photo-1545562083-a600704fa486?q=80&w=1920&auto=format&fit=crop" alt="Gujarat Tour" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-20">
          <div className="max-w-2xl reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/20 text-gold-400 text-[11px] font-bold tracking-wider mb-6 border border-gold-500/30">
              <span className="iconify" data-icon="mdi:compass"></span> EXPLORE INDIA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Exclusive <span className="gold-text font-serif italic">Tour</span> Packages
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-8">
              Experience the best of Gujarat and Rajasthan with our premium tours. Breathtaking destinations, expert drivers, and unforgettable memories await.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#gujarat-tours" className="btn-gold px-8 py-3.5 rounded-full text-[14px] font-bold flex items-center gap-2">
                Explore Packages <span className="iconify" data-icon="mdi:chevron-down"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gujarat Tours */}
      <div id="gujarat-tours" className="py-20 max-w-[1400px] mx-auto px-6 lg:px-10" style={{ scrollMarginTop: '80px' }}>
        <div className="text-center mb-16 reveal">
          <div className="section-label justify-center mb-5">Gujarat Tourism</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 mb-5">
            Discover <span className="gold-text font-serif italic">Gujarat</span>
          </h2>
          <div className="ornament-divider mt-6"><div className="ornament-dot"></div></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal reveal-d1">
          {tourData.gujarat.map((tour, i) => (
            <TourCard key={i} tour={tour} />
          ))}
        </div>
      </div>

      {/* Out of Gujarat Tours */}
      <div className="py-20 bg-stone-100 border-t border-stone-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 reveal">
            <div className="section-label justify-center mb-5">Out of Gujarat Tour</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 mb-5">
              Incredible <span className="gold-text font-serif italic">Rajasthan</span>
            </h2>
            <div className="ornament-divider mt-6"><div className="ornament-dot"></div></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal reveal-d1">
            {tourData.rajasthan.map((tour, i) => (
              <TourCard key={i} tour={tour} />
            ))}
          </div>
        </div>
      </div>

      <div id="book-tour">
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Tours;
