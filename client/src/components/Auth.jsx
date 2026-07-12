import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Auth = ({ closeAuth }) => {
  const { addToast } = useToast();
  const { loginUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(`https://jay-dwarkadish-tours-travels-1.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Save user info and token via Context
      loginUser(data);
      
      addToast(isLogin ? `Welcome back, ${data.name}!` : `Account created! Please login.`, 'success');
      
      if (isLogin) {
        setTimeout(closeAuth, 1000);
        window.location.reload(); // Refresh to update UI state
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={closeAuth}></div>
      
      <div className="relative bg-white rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden flex animate-slide-down min-h-[600px]">
        
        {/* Left Side: Art & Branding */}
        <div className="hidden lg:flex flex-col justify-between w-5/12 relative bg-stone-900 p-10 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-900/40 via-stone-900 to-stone-950 z-0"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
                <span className="iconify text-white text-xl" data-icon="mdi:taxi-front"></span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white">Dwarkesh</span>
                <span className="text-xl font-extrabold text-gold-500">Cab</span>
              </div>
            </div>

            <h2 className="text-4xl font-serif font-bold leading-tight mb-4">
              Your Journey to <span className="gold-text italic">Dwarka</span> Begins Here
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Join thousands of Yatris who trust Dwarkesh Cab for safe, reliable, and spiritual journeys across Gujarat.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-stone-300">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center"><span className="iconify text-gold-400" data-icon="mdi:shield-check"></span></div>
                Verified Professional Drivers
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-300">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center"><span className="iconify text-gold-400" data-icon="mdi:cash-multiple"></span></div>
                No Hidden Charges, Transparent Pricing
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-300">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center"><span className="iconify text-gold-400" data-icon="mdi:clock-check"></span></div>
                24/7 Dedicated Support
              </div>
            </div>
          </div>
          
          <div className="relative z-10 text-[11px] text-stone-500 mt-auto pt-10">
            © 2025 Dwarkesh Cab. All rights reserved.
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 lg:p-16 relative flex flex-col justify-center bg-stone-50">
          <button onClick={closeAuth} className="absolute top-6 right-6 w-10 h-10 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:border-stone-300 transition-all shadow-sm">
            <span className="iconify" data-icon="mdi:close"></span>
          </button>

          <div className="max-w-md w-full mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h3 className="text-3xl font-extrabold text-stone-900 mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h3>
              <p className="text-sm text-stone-500">
                {isLogin ? 'Enter your details to access your bookings.' : 'Join us to book your perfect pilgrimage.'}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex p-1 bg-stone-200/60 rounded-full mb-8 relative">
              <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow transition-all duration-300 ease-out ${isLogin ? 'left-1' : 'left-[calc(50%+3px)]'}`}></div>
              <button type="button" onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 text-sm font-semibold rounded-full relative z-10 transition-colors ${isLogin ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>Login</button>
              <button type="button" onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 text-sm font-semibold rounded-full relative z-10 transition-colors ${!isLogin ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>Register</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="anim-fade-in" style={{ animationDuration: '0.4s' }}>
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <span className="iconify absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg" data-icon="mdi:account"></span>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="form-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
                <div className="relative">
                  <span className="iconify absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg" data-icon="mdi:email"></span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="form-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm" />
                </div>
              </div>

              {!isLogin && (
                <div className="anim-fade-in" style={{ animationDuration: '0.5s' }}>
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <span className="iconify absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg" data-icon="mdi:phone"></span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required className="form-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm" />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Password</label>
                  {isLogin && <a href="#" className="text-[11px] font-bold text-gold-600 hover:text-gold-500 transition-colors">Forgot Password?</a>}
                </div>
                <div className="relative">
                  <span className="iconify absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg" data-icon="mdi:lock"></span>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="form-input w-full pl-11 pr-4 py-3.5 rounded-xl text-sm" />
                </div>
              </div>

              <button type="submit" className="w-full btn-gold text-[15px] font-bold py-4 rounded-xl mt-6 flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20">
                {isLogin ? (
                  <><span className="iconify text-lg" data-icon="mdi:login"></span> Sign In</>
                ) : (
                  <><span className="iconify text-lg" data-icon="mdi:account-plus"></span> Create Account</>
                )}
              </button>
            </form>

            {/* Social Auth */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <button type="button" className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-stone-200 rounded-xl text-[14px] font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm">
                <span className="iconify text-xl text-[#DB4437]" data-icon="mdi:google"></span>
                Continue with Google
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
