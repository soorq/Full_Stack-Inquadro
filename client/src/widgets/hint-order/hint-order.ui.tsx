'use client';

import { Heart, ShoppingCart } from '@phosphor-icons/react';
import { useFavoriteStore } from '~&/src/entities/favorite';
import { useCartStore } from '~&/src/entities/cart';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const HintOrder = () => {
    const path = usePathname();
    const { products: favorite } = useFavoriteStore(state => state);
    const { products: cart } = useCartStore(state => state);

    return (
        <div className="bg-secondary mb-10 w-5/12 rounded-r-[10px] h-full md:hidden">
            <div className="flex py-3 justify-evenly gap-2.5 h-full w-full">
                <Link
                    href="/favorite"
                    className="flex relative flex-col items-center justify-center"
                >
                    <Heart weight="light" className="size-5" />
                    <span className="absolute bg-primary rounded-full flex items-center justify-center text-white size-3.5 text-[9px] right-1.5 -top-1">
                        {favorite.length}
                    </span>
                    <p className="text-xs">Пометка</p>
                </Link>

                <Link
                    href="/cart"
                    className="flex relative flex-col items-center justify-center"
                >
                    <ShoppingCart weight="light" className="size-5" />
                    <span className="absolute bg-primary rounded-full flex items-center justify-center text-white size-3.5 text-[9px] right-1.5 -top-1">
                        {cart.length}
                    </span>
                    <p className="text-xs">Корзина</p>
                </Link>
            </div>
        </div>
    );
};
