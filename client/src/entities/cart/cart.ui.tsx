'use client';

import { ProductOrder } from '~&/src/widgets/product';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from './cart.model';
import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '~&/src/shared/ui/popover';

export const CartPreview = () => {
    const [focus, setFocus] = React.useState(false);

    const { quantity, products } = useCartStore(
        useShallow(({ quantity, products }) => ({ quantity, products }))
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
                <PopoverContent className="p-0 max-w-[610px] max-h-[500px] h-full overflow-y-auto w-svw">
                    {products.map(product => (
                        <ProductOrder
                            key={product.slug}
                            product={product}
                            isCart
                        />
                    ))}
                </PopoverContent>
            </Popover>

            {focus && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
            )}
        </div>
    );
};
