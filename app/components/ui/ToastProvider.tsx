import React from 'react';
import { Toast, ToastTitle, ToastDescription, ToastClose } from './Toast';
import { useToast } from '@/hooks/use-toast';

export function ToastProvider() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 flex w-full flex-col space-y-4 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
    </div>
  );
} 