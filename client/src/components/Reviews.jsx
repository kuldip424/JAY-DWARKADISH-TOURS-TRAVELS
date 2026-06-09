import React from 'react';

const Reviews = () => {
  const reviews = [
    { name: 'Rajesh Patel', init: 'RP', pkg: 'Complete Dwarka Tour', text: '"Complete Dwarka Tour was amazing! Driver knew all temple timings and took us to Bet Dwarka before the crowd. Best pilgrimage experience!"' },
    { name: 'Sunita Mishra', init: 'SM', pkg: 'Nageshwar + Beach', text: '"Nageshwar Jyotirling and Shivrajpur Beach in one day — perfectly planned! Clean car, polite driver. Will use again for Somnath trip."' },
    { name: 'Ankit Joshi', init: 'AJ', pkg: 'Family Pilgrimage', text: '"Family of 8 visited Dwarka. Tempo Traveller was spacious. Driver arranged ferry tickets for Bet Dwarka too. Great service!"' }
  ];

  return (
    <section id="reviews" className="py-28 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center mb-5">Testimonials</div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-5">What Our <span className="gold-text font-serif italic">Yatris</span> Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-stone-50 rounded-[20px] p-8 border border-stone-100 reveal reveal-d1 hover:-translate-y-1 transition-all">
              <div className="flex gap-0.5 mb-5">
                {[1, 2, 3, 4, 5].map(star => <span key={star} className="iconify text-amber-400 text-lg" data-icon="mdi:star"></span>)}
              </div>
              <p className="text-[14px] text-stone-600 leading-relaxed mb-6">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-[13px] font-bold text-white">{r.init}</div>
                <div>
                  <div className="text-[13px] font-semibold text-stone-800">{r.name}</div>
                  <div className="text-[11px] text-stone-400">{r.pkg}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
