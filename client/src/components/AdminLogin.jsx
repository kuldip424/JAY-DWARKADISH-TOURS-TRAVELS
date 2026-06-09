import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const AdminLogin = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.role !== 'admin') {
        throw new Error('Access denied. This portal is for administrators only.');
      }

      localStorage.setItem('admin_user', JSON.stringify(data));
      addToast('Welcome back, Administrator!', 'success');
      navigate('/admin');
      window.location.reload(); // Refresh to update all components
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-6 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-gold-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="iconify text-white text-4xl" data-icon="mdi:shield-account"></span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif tracking-tight mb-2">Admin Portal</h1>
          <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">Dwarkesh Cab Management</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2 block ml-1">Admin Email</label>
              <div className="relative">
                <span className="iconify absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-xl" data-icon="mdi:email-outline"></span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dwarkeshcab.com"
                  required
                  className="w-full bg-stone-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition-all placeholder:text-stone-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2 block ml-1">Secure Password</label>
              <div className="relative">
                <span className="iconify absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-xl" data-icon="mdi:lock-outline"></span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-stone-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-[15px] focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition-all placeholder:text-stone-600"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-gold-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="iconify text-xl" data-icon="mdi:login-variant"></span>
                  Authorize Access
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <a href="/" className="text-stone-500 text-[13px] font-semibold hover:text-gold-500 transition-colors flex items-center justify-center gap-2">
              <span className="iconify" data-icon="mdi:arrow-left"></span>
              Back to Main Website
            </a>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-stone-600 text-[11px] font-medium tracking-tight">
            © 2025 Dwarkesh Cab Secure Infrastructure. <br/> Authorized Personnel Only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
