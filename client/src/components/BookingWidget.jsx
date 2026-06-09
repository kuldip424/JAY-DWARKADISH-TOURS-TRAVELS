import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState('Oneway');

  const tabs = ['Oneway', 'Round Trip', 'Local', 'Airport'];

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="booking-widget glass"
      >
        <div className="tabs" style={{ display: 'flex', gap: '8px', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '16px', width: 'fit-content' }}>
          {tabs.map(tab => (
            <motion.div 
              key={tab} 
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ background: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)' }}
              style={{ 
                cursor: 'pointer',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '700',
                transition: '0.3s',
                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'black' : 'white'
              }}
            >
              {tab}
            </motion.div>
          ))}
        </div>

        <form className="booking-form">
          <div className="form-group">
            <label><MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Pickup Location</label>
            <input type="text" placeholder="Enter City or Airport" />
          </div>
          <div className="form-group">
            <label><MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Drop Location</label>
            <input type="text" placeholder="Enter Destination" />
          </div>
          <div className="form-group">
            <label><Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label><Clock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Time</label>
            <input type="time" />
          </div>
          <motion.button 
            type="submit" 
            className="btn-book"
            whileTap={{ scale: 0.98 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            Search Cabs <ArrowRight size={18} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingWidget;
