// ✅ Better type constraints
import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  "flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost: "bg-transparent text-brand-600 hover:bg-brand-50",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    }
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  children, 
  isLoading, 
  variant,
  size,
  disabled, 
  ...props 
}) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};