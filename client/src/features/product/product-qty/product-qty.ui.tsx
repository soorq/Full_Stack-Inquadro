'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { useEffect, useState, useCallback, memo } from 'react';
import type { ProductClient } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import { Minus, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

const CartWidget = dynamic(
    () => import('../../cart-widget').then(cn => cn.CartWidget),
    { ssr: false, loading: () => <></> }
);

const FavoriteWidget = dynamic(
    () =>
        import('~&/src/features/favorite-widget').then(cn => cn.FavoriteWidget),
    { ssr: false, loading: () => <></> }
);

export const ProductQty = memo(
    ({ product }: { product: ProductClient | null }) => {
        const [qty, setQty] = useState<number>(1);
        const { products: cartProducts, updateQuantityFn } = useCartStore(
            state => state
        );

        // Use useEffect to update qty based on cartProducts
        useEffect(() => {
            if (product) {
                const cartProduct = cartProducts.find(
                    p => p.article === product.article
                );
                if (cartProduct) {
                    setQty(cartProduct.quantity);
                } else {
                    setQty(1);
                }
            }
        }, [cartProducts, product]);

        const isInCart = product
            ? cartProducts.some(p => p.article === product.article)
            : false;

        const updateCartQuantity = useCallback(
            (newQty: number) => {
                if (product && isInCart) {
                    updateQuantityFn(product.article, newQty);
                }
            },
            [product, isInCart, updateQuantityFn]
        );

        const changeQty = (diff: number) => {
            setQty(prevState => {
                const newQty = Math.max(1, Math.min(99, prevState + diff));
                updateCartQuantity(newQty);
                return newQty;
            });
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newQty = Number(e.target.value);
            if (newQty >= 1 && newQty <= 99) {
                setQty(newQty);
                if (product) {
                    updateCartQuantity(newQty);
                }
            } else if (e.target.value === '') {
                setQty(1);
                if (product) {
                    updateCartQuantity(1);
                }
            }
        };

        if (!product) return null;

        const { totalCost, totalTileArea } = calculateTileMetrics(
            product.size ?? '', // Обеспечиваем, что значения не равны null
            +product.kit,
            +product.price,
            qty
        );

        return (
            <div className="py-2.5 w-full h-full">
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

                <div className="flex gap-1.5 w-full h-auto">
                    <div
                        className={cn(
                            'flex gap-1.5',
                            isInCart ? 'md:flex-row w-full' : 'w-full'
                        )}
                    >
                        {isInCart && (
                            <div className="flex gap-1.5">
                                <Button
                                    onClick={() => changeQty(-1)}
                                    disabled={qty <= 1}
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
                                    disabled={qty >= 99}
                                    className="size-[50px]"
                                >
                                    <Plus />
                                </Button>
                            </div>
                        )}

                        <CartWidget
                            product={product}
                            className="w-2/3"
                            qty={qty}
                        />
                        <FavoriteWidget
                            className="[&>svg]:fill-red-400 [&>svg]:size-7 size-[50px]"
                            product={product}
                            qty={qty}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

ProductQty.displayName = 'ProductQty';
