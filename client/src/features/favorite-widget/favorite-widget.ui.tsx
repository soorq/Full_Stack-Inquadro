'use client';

import { useFavoriteStore } from '~&/src/entities/favorite';
import { ProductClient } from '~&/src/entities/product';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Heart } from '@phosphor-icons/react';

export const FavoriteWidget = ({
    className,
    product,
    qty
}: {
    product: ProductClient;
    className?: string;
    qty: number;
}) => {
    const { addFn, products, delFn } = useFavoriteStore(state => state);

    const isFavorite = products.some(p => p.article === product.article);

    const toggleFavorite = () => {
        if (isFavorite) {
            delFn(product.article);
        } else {
            addFn(product, qty);
        }
    };

    return (
        <Button
            size="icon"
            className={cn(
                'group/favorite shadow-none cursor-pointer',
                {
                    'hover:bg-red-400/35 bg-white/25 ': !isFavorite,
                    'bg-red-400/35 hover:bg-red-400/35': isFavorite
                },
                className
            )}
            onClick={toggleFavorite}
        >
            <Heart
                weight="fill"
                size={23}
                className={cn('stroke-white transition-colors size-full', {
                    'group-hover/favorite:fill-red-400 group-hover/favorite:stroke-red-400':
                        !isFavorite,
                    '!fill-red-400 stroke-red-400': isFavorite
                })}
            />
        </Button>
    );
};
