'use client';

import { useProductStore } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { Button } from '~&/src/shared/ui/button';
import { calculateTileMetrics } from './qty.lib';
import type { TypePropsQty } from './qty.types';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import { Minus, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

const CartAdd = dynamic(
    () => import('~&/src/features/cart').then(cn => cn.CartAdd),
    { ssr: false, loading: () => <a></a> }
);

const CartDel = dynamic(
    () => import('~&/src/features/cart').then(cn => cn.CartDel),
    { ssr: false, loading: () => <a></a> }
);

const FavoriteAdd = dynamic(
    () => import('~&/src/features/favorite').then(cn => cn.FavoriteAdd),
    { ssr: false, loading: () => <a></a> }
);

export const SpecifyQty = ({
    withFavorite = false,
    withCart = false,
    disable = false,
    className,
    setQty,
    qty
}: TypePropsQty) => {
    const { product_client } = useProductStore(state => state);
    const { products: c_product } = useCartStore();
    if (!product_client) return null;

    const changeQty = (diff: number) => {
        setQty?.(prevState => Math.max(1, Math.min(99, prevState + diff)));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQty = Number(e.target.value);
        if (newQty >= 1 && newQty <= 99) {
            setQty?.(newQty);
        } else if (e.target.value === '') {
            setQty?.(1);
        }
    };

    const { totalCost, totalTileArea } = calculateTileMetrics(
        product_client.size,
        +product_client.kit,
        +product_client.price,
        qty
    );

    return (
        <div className={cn('py-2.5 w-full h-full', className)}>
            <div className="flex gap-1.5 items-center mb-1.5 shrink-0">
                <div className="h-12 w-fit px-2.5 py-1.5 gap-1 flex items-center bg-secondary rounded-[10px]">
                    <p className="text-lg">{totalCost.toFixed(2)}</p>
                    <p className="text-lg text-black/50">руб.</p>
                </div>
                <div className="h-12 w-fit px-2.5 py-1.5 gap-1 flex items-center bg-secondary rounded-[10px]">
                    <p className="text-lg">{totalTileArea.toFixed(3)}</p>
                    <p className="text-lg text-black/50">м²</p>
                </div>
            </div>

            <div className="flex gap-3.5 w-full h-auto">
                <div
                    className={cn(
                        'flex gap-1.5',
                        c_product.length > 0 ? 'w-full' : 'w-6/12'
                    )}
                >
                    {withCart && c_product.length > 0 && (
                        <>
                            <Button
                                onClick={() => changeQty(-1)}
                                disabled={qty <= 1 || disable}
                                className="size-[50px]"
                            >
                                <Minus />
                            </Button>

                            <Input
                                className="size-[50px] px-1 text-center text-lg shrink-0 bg-secondary"
                                onChange={handleInputChange}
                                value={qty}
                                max={99}
                                min={1}
                            />

                            <Button
                                onClick={() => changeQty(1)}
                                disabled={qty >= 99 || disable}
                                className="size-[50px]"
                            >
                                <Plus />
                            </Button>
                        </>
                    )}
                    {withCart && c_product.length > 0 ? (
                        <CartDel id={''} />
                    ) : (
                        <CartAdd product={product_client} />
                    )}
                </div>
                {withFavorite && <FavoriteAdd />}
            </div>
        </div>
    );
};
