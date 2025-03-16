import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border-secondary-200 bg-white text-secondary-900',
        success: 'border-success-200 bg-success-50 text-success-900',
        error: 'border-error-200 bg-error-50 text-error-900',
        warning: 'border-warning-200 bg-warning-50 text-warning-900',
        info: 'border-info-200 bg-info-50 text-info-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const ToastActionElement = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-secondary-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-error-100 group-[.destructive]:hover:border-error-50 group-[.destructive]:hover:bg-error-50 group-[.destructive]:hover:text-error-900 group-[.destructive]:focus:ring-error-400 group-[.destructive]:focus:ring-offset-error-600',
      className
    )}
    {...props}
  />
));
ToastActionElement.displayName = 'ToastAction';

const ToastClose = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-secondary-500 opacity-0 transition-opacity hover:text-secondary-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-error-300 group-[.destructive]:hover:text-error-50 group-[.destructive]:focus:ring-error-400 group-[.destructive]:focus:ring-offset-error-600',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastActionElement> &
  VariantProps<typeof toastVariants>;

const Toast = React.forwardRef<
  React.ElementRef<'div'>,
  ToastProps
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = 'Toast';

export {
  type ToastProps,
  type ToastActionElementProps,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastActionElement,
}; 