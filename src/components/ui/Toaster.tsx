import { useState, useEffect, FC, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToasterContextValue {
  showToast: (toast: Omit<Toast, 'id'>) => void;
}

// Default toast config
const DEFAULT_DURATION = 5000;

// Create a global toast state
let toasts: Toast[] = [];
let listeners: Function[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener([...toasts]));
};

// Toast context value
export const toaster: ToasterContextValue = {
  showToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    toasts = [...toasts, { ...toast, id }];
    notifyListeners();

    // Auto remove
    const duration = toast.duration || DEFAULT_DURATION;
    setTimeout(() => {
      toasts = toasts.filter(t => t.id !== id);
      notifyListeners();
    }, duration);
  }
};

// Toast component
const Toast: FC<ToastProps> = ({ id, type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const Icon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-error-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-200';
      case 'error':
        return 'bg-error-50 border-error-200';
      case 'warning':
        return 'bg-warning-50 border-warning-200';
      case 'info':
        return 'bg-primary-50 border-primary-200';
      default:
        return 'bg-white border-neutral-200';
    }
  };

  return (
    <div
      className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border ${getBgColor()} animate-fade-in`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-neutral-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onClose(id)}
              className="inline-flex text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toaster component
export const Toaster = () => {
  const [visibleToasts, setVisibleToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToastsChange = (newToasts: Toast[]) => {
      setVisibleToasts(newToasts);
    };

    listeners.push(handleToastsChange);
    return () => {
      listeners = listeners.filter(listener => listener !== handleToastsChange);
    };
  }, []);

  const handleClose = (id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    notifyListeners();
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 max-h-screen overflow-hidden pointer-events-none">
      {visibleToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={handleClose}
          />
        </div>
      ))}
    </div>
  );
};

export default Toaster;