import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';

/** Show a toast: addToast('Saved!', 'success' | 'error' | 'info') */
export const useToast = () => useContext(ToastContext);
