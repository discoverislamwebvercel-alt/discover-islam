'use client';

import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position='top-right'
      reverseOrder={false}
      gutter={8}
      containerClassName=''
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        // Success toast styling
        success: {
          duration: 4000,
          style: {
            background: '#408360',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(64, 131, 96, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#408360',
          },
        },
        // Error toast styling
        error: {
          duration: 5000,
          style: {
            background: '#dc2626',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(220, 38, 38, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#dc2626',
          },
        },
        // Loading toast styling
        loading: {
          style: {
            background: '#6b7280',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(107, 114, 128, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
