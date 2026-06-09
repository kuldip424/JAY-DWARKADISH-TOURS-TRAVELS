import React from 'react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { addToast } = useToast();
  const handleContact = (e) => {
    e.preventDefault();
    addToast("Message sent! We'll get back to you shortly.", 'success');
    e.target.reset();
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
          <div className="reveal">
            <div className="section-label mb-5">Contact Us</div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 mb-6 font-serif">Get In <span className="gold-text italic">Touch</span></h2>
            <p className="text-stone-500 text-lg mb-10">Questions about Dwarka packages? We're here 24/7.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0"><span className="iconify text-gold-500 text-xl" data-icon="mdi:phone"></span></div><div><div className="text-[13px] font-semibold text-stone-800 mb-0.5">Phone</div><a href="tel:+917623862884" className="text-[14px] text-stone-500 hover:text-gold-500 transition-colors">+91 76238 62884</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0"><span className="iconify text-gold-500 text-xl" data-icon="mdi:whatsapp"></span></div><div><div className="text-[13px] font-semibold text-stone-800 mb-0.5">WhatsApp</div><a href="https://wa.me/917623862884" className="text-[14px] text-stone-500 hover:text-green-500 transition-colors">Chat with us</a></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0"><span className="iconify text-gold-500 text-xl" data-icon="mdi:map-marker-outline"></span></div><div><div className="text-[13px] font-semibold text-stone-800 mb-0.5">Office</div><p className="text-[14px] text-stone-500">Dwarka, Gujarat 361335</p></div></div>
            </div>
          </div>
          <div className="reveal reveal-d2">
            <form onSubmit={handleContact} className="bg-stone-50 rounded-[24px] p-8 lg:p-10 border border-stone-200/50">
              <h3 className="text-[17px] font-bold text-stone-800 mb-7">Send a Message</h3>
              <div className="space-y-4">
                <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Name</label><input type="text" placeholder="Your name" required className="form-input w-full px-4 py-3 rounded-xl text-sm" /></div>
                <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Phone</label><input type="tel" placeholder="+91 XXXXX" required className="form-input w-full px-4 py-3 rounded-xl text-sm" /></div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Package Interest</label>
                  <select className="form-input w-full px-4 py-3 rounded-xl text-sm pr-10">
                    <option>Dwarka Local Darshan</option>
                    <option>Complete Dwarka Tour</option>
                    <option>Dwarka + Somnath</option>
                    <option>Beach & Temple</option>
                    <option>Nageshwar Jyotirling</option>
                    <option>Custom Package</option>
                  </select>
                </div>
                <div><label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 block">Message</label><textarea rows="4" placeholder="Your travel plans..." required className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"></textarea></div>
              </div>
              <button type="submit" className="w-full btn-gold text-[15px] font-semibold py-4 rounded-full mt-6 flex items-center justify-center gap-2"><span className="iconify" data-icon="mdi:send"></span>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
