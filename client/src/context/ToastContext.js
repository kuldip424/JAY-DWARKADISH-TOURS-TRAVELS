import { createContext } from 'react';

// Value is provided by <ToastProvider>. Read it with the useToast() hook.
export const ToastContext = createContext(null);
