import { createContext, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext<{
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
} | null>(null);

interface ToastsProviderProps {
  children: React.ReactNode;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) => {
  return createPortal(
    <div id="toast-container" style={{ ...styles.toastContainer as React.CSSProperties }}>
      {toasts.map((toast) => (
        <div key={toast.id} style={{ ...styles.toast as React.CSSProperties, ...styles[toast.type] as React.CSSProperties }}>
          {toast.message}
          <button style={{ marginLeft: '10px' }} onClick={() => removeToast(toast.id)}>
            X
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
}

export const ToastsProvider = ({ children }: ToastsProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const showToast = (message: string, type: 'success' | 'error' | 'info', delay: number = 3000) => {
    const id = crypto.randomUUID();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    const timeoutId = setTimeout(() => { removeToast(id) }, delay);
    toastTimeoutRef.current.set(id, timeoutId);
  }

  const removeToast = (id: string) => {
    console.log('Removing toast with id:', id);

    const timeoutId = toastTimeoutRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      toastTimeoutRef.current.delete(id);
    }

    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const success = (message: string) => showToast(message, 'success');
  const error = (message: string) => showToast(message, 'error');
  const info = (message: string) => showToast(message, 'info');

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
};

export const useToasts = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToasts must be used within a ToastsProvider');
  }
  return context;
}

const styles = {
  toastContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
  },
  toast: {
    padding: '5px 10px',
    marginBottom: '10px',
    borderRadius: '4px',
    minWidth: '200px',
    fontSize: '14px',
  },
  success: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  error: {
    backgroundColor: '#F44336',
    color: 'white',
  },
  info: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
};
