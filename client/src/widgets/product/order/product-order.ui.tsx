import type { ProductClient } from '~&/src/entities/product';
import { Badge } from '~&/src/shared/ui/badge';
import Image from 'next/image';
import React from 'react';
import {
    type FavoritesContextProps,
    type ConfirmContextProps,
    type CartContextProps,
    OrderSpecifyQty
} from '~&/src/features/order-qty';
import { FavoriteWidget } from '~&/src/features/favorite-widget';
import { cn } from '~&/src/shared/lib/tw-merge';

type ProductOrderProps = {
    product: ProductClient;
    isInCart?: boolean;
    className?: string;
} & (CartContextProps | FavoritesContextProps | ConfirmContextProps);

const properties = ['size', 'usage', 'shade'] as const;

export const ProductOrder = ({
    product,
    isInCart,
    className,
    ...orderProps
}: ProductOrderProps) => (
    <div className={cn('flex gap-5 w-auto h-auto p-4', className)}>
        <div className="relative w-full h-svh max-w-[170px] max-h-[230px]">
            <Image
                src="/product/main.png"
                className="rounded-[10px]"
                alt={product.name}
                fill
            />

            <div className="absolute top-1.5 right-1.5">
                <FavoriteWidget
                    product={product}
                    className="size-10"
                    qty={orderProps.qty}
                />
            </div>

            <div className="absolute bottom-1.5 left-1.5">
                <Badge variant="mobile">{product.kit} шт.</Badge>
            </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
            <div className="bg-secondary p-2.5 rounded-[10px]">
                <div className="flex justify-between">
                    <p className="text-sm text-black/50">{product.category}</p>
                    <p className="text-sm text-black/50">
                        {product.availability}
                    </p>
                </div>
                <h4 className="text-xl">{product.name}</h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {properties.map(prop => (
                    <Badge key={prop} variant="order">
                        {product[prop]}
                    </Badge>
                ))}
            </div>

            <OrderSpecifyQty isInCart={isInCart} {...orderProps} />
        </div>
    </div>
);
