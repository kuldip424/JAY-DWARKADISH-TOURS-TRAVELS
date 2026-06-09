import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const AdminDashboard = ({ closeAdmin }) => {
  const { addToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });

  useEffect(() => {
    fetchAllBookings();
    // Set up polling for new bookings every 30 seconds
    const interval = setInterval(fetchAllBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllBookings = async () => {
    const userData = JSON.parse(localStorage.getItem('admin_user'));
    
    if (!userData || !userData.token || userData.role !== 'admin') {
      addToast('Access denied. Admin privileges required.', 'error');
      closeAdmin();
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/bookings/admin/all', {
        headers: { 'Authorization': `Bearer ${userData.token}` }
      });
      const data = await res.json();
      if (res.ok) {
        // Sort: pending first, then by date
        const sorted = data.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        // Notify if new bookings arrived (simple check)
        if (bookings.length > 0 && sorted.length > bookings.length) {
          const newCount = sorted.length - bookings.length;
          addToast(`${newCount} New booking request(s) received!`, 'info');
          // Play a subtle sound if possible, or just the toast
        }

        setBookings(sorted);
        calculateStats(sorted);
      } else {
        throw new Error(data.message || 'Access denied');
      }
    } catch (error) {
      addToast(error.message, 'error');
      closeAdmin();
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const pending = data.filter(b => b.status === 'pending').length;
    const revenue = data.filter(b => b.status === 'completed' || b.status === 'confirmed').reduce((acc, b) => acc + b.fare.total, 0);
    setStats({ total, pending, revenue });
  };

  const updateStatus = async (id, status) => {
    const userData = JSON.parse(localStorage.getItem('admin_user'));
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        addToast(`Booking ${status} successfully`, 'success');
        fetchAllBookings();
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    window.location.href = '/admin'; // Redirect to admin login
  };

  const filtered = bookings.filter(b => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  return (
    <div className="fixed inset-0 z-[160] flex flex-col bg-stone-100 animate-fade-in overflow-hidden">
      {/* Header */}
      <header className="bg-stone-900 px-6 lg:px-10 h-20 flex items-center justify-between shrink-0 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={closeAdmin} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <span className="iconify text-xl" data-icon="mdi:arrow-left"></span>
          </button>
          <div>
            <h1 className="text-xl font-extrabold font-serif flex items-center gap-2">
              <span className="text-gold-500 underline decoration-gold-500/30 underline-offset-4">Admin</span> Panel
            </h1>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Booking Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="text-[11px] font-bold text-gold-500 uppercase tracking-wider">Live Monitoring</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 font-bold">A</div>
            <button 
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl text-[12px] font-bold transition-all border border-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/60">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-600"><span className="iconify text-2xl" data-icon="mdi:inbox-multiple"></span></div>
                <span className="text-[11px] font-bold text-stone-400">Total Bookings</span>
              </div>
              <div className="text-3xl font-black text-stone-900">{stats.total}</div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/60 ring-2 ring-amber-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600"><span className="iconify text-2xl" data-icon="mdi:bell-ring-outline"></span></div>
                <span className="text-[11px] font-bold text-amber-500">New Requests</span>
              </div>
              <div className="text-3xl font-black text-amber-600">{stats.pending}</div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/60">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600"><span className="iconify text-2xl" data-icon="mdi:currency-inr"></span></div>
                <span className="text-[11px] font-bold text-emerald-500">Total Revenue</span>
              </div>
              <div className="text-3xl font-black text-stone-900">₹{stats.revenue.toLocaleString()}</div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200/60">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><span className="iconify text-2xl" data-icon="mdi:account-group"></span></div>
                <span className="text-[11px] font-bold text-blue-500">Active Users</span>
              </div>
              <div className="text-3xl font-black text-stone-900">{[...new Set(bookings.map(b => b.user?._id))].length}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-stone-200/60">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setActiveTab(t)}
                  className={`px-6 py-2.5 rounded-xl text-[12px] font-bold capitalize transition-all ${activeTab === t ? 'bg-stone-900 text-white' : 'text-stone-500 hover:bg-stone-100'}`}
                >
                  {t} {t === 'pending' && stats.pending > 0 && <span className="ml-1 bg-amber-500 text-white px-1.5 rounded-full text-[10px]">{stats.pending}</span>}
                </button>
              ))}
            </div>
            <button onClick={fetchAllBookings} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-[13px] font-bold px-4 py-2 rounded-xl hover:bg-white transition-all">
              <span className="iconify" data-icon="mdi:refresh"></span> Refresh Data
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[32px] shadow-xl shadow-stone-200/50 border border-stone-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">Booking Details</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">Date & Time</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest">Fare</th>
                    <th className="px-8 py-5 text-[11px] font-bold text-stone-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {loading ? (
                    <tr><td colSpan="6" className="py-20 text-center"><div className="w-8 h-8 border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin mx-auto"></div></td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan="6" className="py-20 text-center text-stone-400 font-medium">No bookings found in this category.</td></tr>
                  ) : filtered.map((b) => (
                    <tr key={b._id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-600 uppercase">{b.customerInfo.name.charAt(0)}</div>
                          <div>
                            <div className="text-[14px] font-bold text-stone-900">{b.customerInfo.name}</div>
                            <div className="text-[12px] text-stone-400 flex items-center gap-1"><span className="iconify" data-icon="mdi:phone"></span>{b.customerInfo.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-[13px] font-semibold text-stone-800">
                          {b.type === 'package' ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-gold-600">
                                <span className="iconify" data-icon="mdi:island"></span>{b.details.packageName}
                              </div>
                              <div className="flex items-center gap-2 text-stone-600 text-[12px]">
                                <span className="iconify text-emerald-500 text-xs" data-icon="mdi:circle-slice-8"></span>
                                <span className="font-bold">Pick:</span> {b.details.pickup || 'Not Specified'}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-stone-900">
                                <span className="iconify text-emerald-500 text-xs" data-icon="mdi:circle-slice-8"></span>
                                <span className="font-bold">Pick:</span> {b.details.pickup}
                              </div>
                              <div className="flex items-center gap-2 text-stone-600">
                                <span className="iconify text-red-500 text-xs" data-icon="mdi:map-marker"></span>
                                <span className="font-bold">Drop:</span> {b.details.destination}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-2 flex items-center gap-3 bg-stone-50 w-fit px-2 py-1 rounded-md">
                          <div className="flex items-center gap-1"><span className="iconify" data-icon="mdi:car"></span> {b.details.carType}</div>
                          <div className="flex items-center gap-1"><span className="iconify" data-icon="mdi:account-group"></span> {b.details.passengers} Pax</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="text-[13px] font-bold text-stone-800 flex items-center gap-2">
                            <span className="iconify text-stone-400" data-icon="mdi:calendar-range"></span>
                            {new Date(b.details.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="text-[12px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg w-fit flex items-center gap-1">
                            <span className="iconify" data-icon="mdi:clock-outline"></span>
                            {b.details.time || 'TBA'}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border 
                          ${b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            b.status === 'completed' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                            'bg-red-50 text-red-600 border-red-100'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-extrabold text-stone-900">₹{b.fare.total.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          {b.status === 'pending' && (
                            <>
                              <button onClick={() => updateStatus(b._id, 'confirmed')} className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shadow-sm transition-all" title="Confirm"><span className="iconify" data-icon="mdi:check"></span></button>
                              <button onClick={() => updateStatus(b._id, 'cancelled')} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-sm transition-all" title="Cancel"><span className="iconify" data-icon="mdi:close"></span></button>
                            </>
                          )}
                          {b.status === 'confirmed' && (
                            <button onClick={() => updateStatus(b._id, 'completed')} className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 shadow-sm transition-all" title="Mark Completed"><span className="iconify" data-icon="mdi:flag-checkered"></span></button>
                          )}
                          <a href={`https://wa.me/${b.customerInfo.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${b.customerInfo.name}, I'm from Dwarkesh Cab regarding your booking for ${b.details.date}.`)}`} target="_blank" className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 shadow-sm transition-all" title="WhatsApp Customer"><span className="iconify" data-icon="mdi:whatsapp"></span></a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
