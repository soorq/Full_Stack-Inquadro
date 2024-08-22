'use client';

import { ProductClient } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';

export const CartWidget = ({
    className,
    product,
    qty
}: {
    product: ProductClient;
    className?: string;
    qty: number;
}) => {
    const { addFn, products, delFn } = useCartStore(state => state);

    const isInCart = products.some(p => p.article === product.article);

    const handlerFn = () => {
        if (isInCart) {
            delFn(product.article);
        } else {
            addFn(product, qty);
        }
    };

    return (
        <Button
            onClick={handlerFn}
            className={cn('h-[50px] w-full text-lg', className)}
            type="button"
        >
            {isInCart ? 'Сейчас в корзине' : 'Добавить в корзину'}
        </Button>
    );
};
