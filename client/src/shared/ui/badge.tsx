import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~&/src/shared/lib/tw-merge';

const badgeVariants = cva(
    'inline-flex items-center rounded-[10px] border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-muted-foreground shadow hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
                order: 'h-8 sm:h-10 py-1 sm:py-2.5 text-white text-xs sm:text-sm font-normal bg-primary',
                mobile: 'bg-white/25 border-none text-white w-fit'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
