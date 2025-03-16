import React from 'react';
import { Toast, ToastTitle, ToastDescription, ToastClose } from './Toast';
import { useToast } from '@/hooks/use-toast';

export function ToastProvider() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4">
      {toasts.map(({ id, title, description, action }) => (
        <Toast key={id} id={id} title={title} description={description} action={action} />
      ))}
    </div>
  );
} 