import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div id="toast-box" className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map(t => {
          const colors = {
            success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
            error: 'bg-red-50 border-red-200 text-red-800',
            info: 'bg-gold-50 border-gold-200 text-stone-800'
          };
          const icons = {
            success: 'mdi:check-circle',
            error: 'mdi:alert-circle',
            info: 'mdi:information'
          };
          return (
            <div key={t.id} className={`toast-enter pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-xl max-w-sm transition-opacity duration-300 ${colors[t.type] || colors.info}`}>
              <span className="iconify text-lg flex-shrink-0 mt-0.5" data-icon={icons[t.type] || icons.info}></span>
              <p className="text-[13px] font-medium">{t.msg}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
