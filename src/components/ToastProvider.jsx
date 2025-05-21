'use client';

import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: '#4aed88',
          },
        },
        error: {
          duration: 3000,
          theme: {
            primary: '#ff4b4b',
          },
        },
      }}
    />
  );
};

export default ToastProvider; 