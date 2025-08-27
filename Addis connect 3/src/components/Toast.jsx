import { useEffect } from 'react';

function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  let bg = 'bg-base-100 border-base-300';
  if (type === 'success') bg = 'bg-success/90 border-success';
  if (type === 'error') bg = 'bg-error/90 border-error';

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl shadow-lg border ${bg} text-base-content`}>
      {message}
    </div>
  );
}

export default Toast;
