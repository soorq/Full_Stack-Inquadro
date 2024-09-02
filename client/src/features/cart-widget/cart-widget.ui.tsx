'use client';

import { ProductClient } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { useEffect } from 'react';
import Link from 'next/link';

export const CartWidget = ({
    className,
    product,
    qty
}: {
    product: ProductClient;
    className?: string;
    qty: number;
}) => {
    const { addFn, products, delFn, setOpenCart, open } = useCartStore(
        state => state
    );

    const isInCart = products.some(p => p.article === product.article);

    const handlerFn = () => {
        if (isInCart) {
            delFn(product.article);
        } else {
            addFn(product, qty);
        }
    };

    return isInCart ? (
        <>
            <Button
                onClick={() => setOpenCart(true)}
                className={cn('hidden md:flex h-[50px] w-full text-lg', className)}
                type="button"
            >
                Сейчас в корзине
            </Button>
            <Button
                onClick={() => setOpenCart(true)}
                className={cn('md:hidden h-[50px] w-full text-lg', className)}
                type="button"
                asChild
            >
                <Link href='/cart'>
                    в корзине
                </Link>
            </Button>
        </>
    ) : (
        <Button
            className={cn('h-[50px] w-full text-lg', className)}
            onClick={handlerFn}
            type="button"
        >
            Добавить в корзину
        </Button>
    );
};
