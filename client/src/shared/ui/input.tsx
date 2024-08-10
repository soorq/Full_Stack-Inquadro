import * as React from 'react';

import { cn } from '~&/src/shared/lib/tw-merge';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    withRing?: boolean;
    withBorder?: boolean;
    withShadow?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, withRing, withShadow, withBorder, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                    withRing
                        ? 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                        : 'focus-visible:outline-none',
                    withBorder ? 'border border-input' : '',
                    withShadow ? 'shadow-sm' : '',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
