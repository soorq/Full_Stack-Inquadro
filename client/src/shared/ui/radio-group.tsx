'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Check } from '@phosphor-icons/react';

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn('flex flex-col gap-2.5', className)}
            {...props}
            ref={ref}
        />
    );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
        withIndicator?: boolean;
    }
>(({ className, withIndicator = false, children, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                'text-primary focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                withIndicator
                    ? 'size-5 bg-white rounded-full data-[state=checked]:bg-primary'
                    : '',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                className={cn(
                    withIndicator
                        ? 'flex items-center [&>svg]:data-[state=checked]:text-white size-5 justify-center'
                        : '[&>label]:data-[state=checked]:underline underline-offset-2 h-6'
                )}
            >
                {!withIndicator && children}
                {withIndicator && (
                    <Check weight="regular" className="size-full p-1" />
                )}
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
