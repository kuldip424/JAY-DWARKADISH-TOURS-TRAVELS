import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = ({ closeDashboard }) => {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    if (!user || !user.token) {
      addToast('Please login to see bookings', 'error');
      closeDashboard();
      return;
    }

    try {
      const res = await fetch('https://jay-dwarkadish-tours-travels-1.onrender.com/api/bookings', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      console.log('Fetched bookings:', data);
      if (res.ok) {
        // Check for status changes to notify user
        if (bookings.length > 0) {
          data.forEach(newB => {
            const oldB = bookings.find(b => b._id === newB._id);
            if (oldB && oldB.status !== newB.status) {
              if (newB.status === 'confirmed') {
                addToast(`Your booking #${newB._id.slice(-6).toUpperCase()} has been ACCEPTED!`, 'success');
              } else if (newB.status === 'completed') {
                addToast(`Your trip #${newB._id.slice(-6).toUpperCase()} is marked as completed. Thank you!`, 'info');
              }
            }
          });
        }
        setBookings(data);
      } else {
        throw new Error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const res = await fetch(`https://jay-dwarkadish-tours-travels-1.onrender.com/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });
      if (res.ok) {
        addToast('Booking cancelled successfully', 'success');
        fetchBookings();
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'completed': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-stone-50 text-stone-600 border-stone-100';
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex flex-col bg-stone-50 animate-fade-in overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 lg:px-10 h-20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={closeDashboard} className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors">
            <span className="iconify text-xl" data-icon="mdi:arrow-left"></span>
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-stone-900 font-serif">My Bookings</h1>
            <p className="text-[11px] text-stone-400 uppercase tracking-widest font-bold">Manage your Dwarka pilgrimage</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[13px] font-bold text-stone-800">{user?.name}</span>
            <span className="text-[11px] text-stone-400">Yatri Dashboard</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 font-bold border border-gold-500/20">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: bookings.length, icon: 'mdi:calendar-check', color: 'text-stone-600', bg: 'bg-white' },
              { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: 'mdi:check-decagram', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
              { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: 'mdi:clock-outline', color: 'text-amber-600', bg: 'bg-amber-50/50' },
              { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, icon: 'mdi:close-circle-outline', color: 'text-red-600', bg: 'bg-red-50/50' },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} border border-stone-200/60 p-4 rounded-2xl flex items-center gap-4`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} bg-white shadow-sm`}>
                  <span className="iconify text-xl" data-icon={s.icon}></span>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-tight">{s.label}</div>
                  <div className={`text-xl font-extrabold ${s.color}`}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 bg-stone-200/50 p-1.5 rounded-2xl w-fit">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(t => (
              <button 
                key={t} 
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2.5 rounded-xl text-[12px] font-bold capitalize transition-all ${activeTab === t ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-stone-400 gap-4">
              <div className="w-10 h-10 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin"></div>
              <p className="text-[13px] font-medium animate-pulse">Fetching your sacred journeys...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white border border-dashed border-stone-300 rounded-[32px] py-24 px-10 text-center">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                <span className="iconify text-4xl" data-icon="mdi:calendar-blank-outline"></span>
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">No bookings found</h3>
              <p className="text-stone-400 text-sm mb-8 max-w-xs mx-auto">You haven't booked any tours yet. Explore our packages and start your journey!</p>
              <button onClick={closeDashboard} className="btn-gold px-8 py-3 rounded-full text-[14px] font-bold shadow-lg shadow-gold-500/20">Explore Packages</button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div key={b._id} className="bg-white border border-stone-200 rounded-[28px] overflow-hidden hover:shadow-xl hover:shadow-stone-200/40 transition-all group">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Status & Main Info */}
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(b.status)}`}>
                            {b.status}
                          </span>
                          <span className="text-[12px] text-stone-400">Order ID: #{b._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <span className="text-[12px] font-medium text-stone-400">{new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>

                      <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                        <span className="iconify text-gold-500" data-icon={b.type === 'package' ? 'mdi:island' : 'mdi:car-connected'}></span>
                        {b.type === 'package' ? b.details.packageName : `${b.details.pickup} to ${b.details.destination}`}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Travel Date</div>
                          <div className="text-[14px] font-semibold text-stone-800 flex items-center gap-2">
                            <span className="iconify text-stone-400" data-icon="mdi:calendar"></span>
                            {new Date(b.details.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Vehicle Type</div>
                          <div className="text-[14px] font-semibold text-stone-800 flex items-center gap-2">
                            <span className="iconify text-stone-400" data-icon="mdi:car-side"></span>
                            {b.details.carType}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Passengers</div>
                          <div className="text-[14px] font-semibold text-stone-800 flex items-center gap-2">
                            <span className="iconify text-stone-400" data-icon="mdi:account-group"></span>
                            {b.details.passengers}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Estimated Fare</div>
                          <div className="text-[14px] font-extrabold text-gold-600">₹{b.fare.total.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="bg-stone-50 border-t md:border-t-0 md:border-l border-stone-100 p-6 flex flex-row md:flex-col justify-center gap-3 min-w-[180px]">
                      {b.status === 'pending' && (
                        <button 
                          onClick={() => cancelBooking(b._id)}
                          className="flex-1 md:w-full py-2.5 rounded-xl border border-red-200 text-red-600 text-[12px] font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                          <span className="iconify" data-icon="mdi:close"></span> Cancel
                        </button>
                      )}
                      <a 
                        href={`https://wa.me/917623862884?text=${encodeURIComponent(`Hi, checking status for Booking #${b._id.slice(-6).toUpperCase()}`)}`}
                        target="_blank"
                        className="flex-1 md:w-full py-2.5 rounded-xl bg-green-500 text-white text-[12px] font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span className="iconify text-lg" data-icon="mdi:whatsapp"></span> Support
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
