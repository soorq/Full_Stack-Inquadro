'use client';

import { Button } from '~&/src/shared/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '~&/src/shared/ui/popover';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '~&/src/entities/cart/cart.store';

import { useShallow } from 'zustand/react/shallow';
import { ProductOrder } from '~&/src/widgets/product';
import React, { useState } from 'react';
import { cn } from '~&/src/shared/lib/tw-merge';

export const CartPreview = () => {
    const [focus, setFocus] = useState(false);

    const { quantity } = useCartStore(
        useShallow(({ quantity }) => ({ quantity }))
    );

    const handlerSwithFocus = (value: boolean) => {
        setFocus(value);
    };

    return (
        <div className="flex items-center gap-1">
            <Popover onOpenChange={handlerSwithFocus}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn(
                            'gap-2 [&>p]:text-black/50 px-0 hover:bg-transparent text-base font-normal',
                            focus
                                ? 'z-30 relative [&>p]:text-white [&>svg]:stroke-white [&>svg]:fill-white'
                                : ''
                        )}
                    >
                        <p>{quantity}</p>
                        <ShoppingCart className="stroke-1" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 max-w-[610px] w-svw">
                    <ProductOrder isCart />
                </PopoverContent>
            </Popover>

            {focus && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
            )}
        </div>
    );
};
