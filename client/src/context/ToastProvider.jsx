import { useState, useCallback } from 'react';
import { ToastContext } from './ToastContext';

const TOAST_STYLES = {
  success: { color: 'bg-emerald-50 border-emerald-200 text-emerald-800', icon: 'mdi:check-circle' },
  error: { color: 'bg-red-50 border-red-200 text-red-800', icon: 'mdi:alert-circle' },
  info: { color: 'bg-gold-50 border-gold-200 text-stone-800', icon: 'mdi:information' },
};

let nextToastId = 0; // unique even when several toasts fire at once

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg, type = 'info') => {
    const id = ++nextToastId;
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div id="toast-box" className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => {
          const style = TOAST_STYLES[t.type] || TOAST_STYLES.info;
          return (
            <div key={t.id} className={`toast-enter pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-xl max-w-sm transition-opacity duration-300 ${style.color}`}>
              <span className="iconify text-lg flex-shrink-0 mt-0.5" data-icon={style.icon}></span>
              <p className="text-[13px] font-medium">{t.msg}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
