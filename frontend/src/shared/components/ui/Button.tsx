// src/shared/components/ui/Button.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-brand text-white shadow-md",
          "hover:shadow-lg hover:scale-[1.02]",
          "active:scale-[0.98]",
          "focus:ring-brand-500",
        ],
        secondary: [
          "bg-brand-100 text-brand-700",
          "hover:bg-brand-200",
          "active:bg-brand-300",
          "focus:ring-brand-500",
        ],
        outline: [
          "border-2 border-gray-300 text-gray-700 bg-white",
          "hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50",
          "active:bg-brand-100",
          "focus:ring-brand-500",
        ],
        ghost: [
          "bg-transparent text-brand-600",
          "hover:bg-brand-50",
          "active:bg-brand-100",
          "focus:ring-brand-500",
        ],
        danger: [
          "bg-danger-500 text-white shadow-md",
          "hover:bg-danger-600 hover:shadow-lg",
          "active:bg-danger-700",
          "focus:ring-danger-500",
        ],
        success: [
          "bg-success-500 text-white shadow-md",
          "hover:bg-success-600 hover:shadow-lg",
          "active:bg-success-700",
          "focus:ring-success-500",
        ],
        link: [
          "text-brand-600 underline-offset-4 p-0",
          "hover:underline hover:text-brand-700",
          "focus:ring-0",
        ],
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Usage Examples:
/*
<Button>Click me</Button>
<Button variant="outline" size="lg">Large Outline</Button>
<Button variant="danger" leftIcon={<Trash />}>Delete</Button>
<Button isLoading>Saving...</Button>
<Button fullWidth>Full Width Button</Button>
*/