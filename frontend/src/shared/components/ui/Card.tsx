// src/shared/components/ui/Card.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

// ============================================
// CARD VARIANTS
// ============================================
const cardVariants = cva(
  "rounded-xl transition-all duration-normal",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-card hover:shadow-card-hover",
        elevated: "bg-white shadow-lg hover:shadow-xl",
        outlined: "bg-white border-2 border-gray-300",
        ghost: "bg-transparent",
        gradient: "bg-gradient-brand text-white shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hoverable: {
        true: "cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

// ============================================
// CARD ROOT COMPONENT
// ============================================
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable }), className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// ============================================
// CARD HEADER
// ============================================
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, divider, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          divider && "pb-4 border-b border-gray-200",
          className
        )}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================
// CARD TITLE
// ============================================
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-xl font-semibold leading-none tracking-tight text-gray-900", className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ============================================
// CARD DESCRIPTION
// ============================================
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600", className)}
      {...props}
    />
  );
});

CardDescription.displayName = 'CardDescription';

// ============================================
// CARD CONTENT
// ============================================
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("pt-4", className)}
      {...props}
    />
  );
});

CardContent.displayName = 'CardContent';

// ============================================
// CARD FOOTER
// ============================================
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  divider?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divider, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center pt-4",
          divider && "border-t border-gray-200",
          className
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ============================================
// STATS CARD (Specific for Dashboard)
// ============================================
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'brand' | 'success' | 'danger' | 'warning';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'brand',
}) => {
  const colorClasses = {
    brand: 'text-brand-600 bg-brand-50',
    success: 'text-success-600 bg-success-50',
    danger: 'text-danger-600 bg-danger-50',
    warning: 'text-warning-600 bg-warning-50',
  };

  return (
    <Card hoverable>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
          
          {trend && (
            <div className={cn(
              "mt-2 text-sm font-medium",
              trend.isPositive ? "text-success-600" : "text-danger-600"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn("p-3 rounded-lg", colorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

// Usage Examples:
/*
// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Stats Card
<StatsCard
  title="Total Tasks"
  value={127}
  icon={<CheckCircle size={24} />}
  trend={{ value: 12, isPositive: true }}
  color="success"
/>
*/