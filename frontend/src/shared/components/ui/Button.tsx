import React from 'react';
import { cn } from '@/shared/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  children, 
  isLoading, 
  variant = 'primary', 
  disabled, 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-brand-600 hover:bg-brand-50"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};