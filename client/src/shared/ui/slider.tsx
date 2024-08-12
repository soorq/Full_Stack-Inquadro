'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '~&/src/shared/lib/tw-merge';
import React, { useState } from 'react';

type SliderProps = {
    className?: string;
    min: number;
    max: number;
    minStepsBetweenThumbs: number;
    step: number;
    formatLabel?: (value: number) => string;
    value?: number[] | readonly number[];
    onValueChange?: (values: number[]) => void;
};

const Slider = React.forwardRef(
    (
        {
            className,
            min,
            max,
            step,
            formatLabel,
            value,
            onValueChange,
            ...props
        }: SliderProps,
        ref
    ) => {
        const initialValue = Array.isArray(value) ? value : [min, max];
        const [localValues, setLocalValues] = useState(initialValue);

        const handleValueChange = (newValues: number[]) => {
            setLocalValues(newValues);
            if (onValueChange) {
                onValueChange(newValues);
            }
        };

        return (
            <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn(
                    'relative flex w-full touch-none select-none mt-6 items-center',
                    className
                )}
                {...props}
            >
                {localValues.map((value, index) => (
                    <React.Fragment key={index}>
                        <div className="absolute text-center">
                            <span className="text-sm">
                                {formatLabel ? formatLabel(value) : value}
                            </span>
                        </div>
                        <SliderPrimitive.Thumb className="block h-3.5 w-3.5 rounded-full bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
                    </React.Fragment>
                ))}
                <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-primary/20">
                    <SliderPrimitive.Range className="absolute h-full bg-primary" />
                </SliderPrimitive.Track>
            </SliderPrimitive.Root>
        );
    }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
