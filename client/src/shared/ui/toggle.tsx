'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~&/src/shared/lib/tw-merge';

const toggleVariants = cva(
    'inline-flex items-center justify-center rounded-[10px] text-sm transition-colors hover:bg-primary/90 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-white',
    {
        variants: {
            variant: {
                default: 'bg-white',
                outline:
                    'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground'
            },
            size: {
                default: 'h-9 px-3',
                sm: 'h-8 px-2',
                lg: 'h-10 px-3'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

const Toggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
        VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
    />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
