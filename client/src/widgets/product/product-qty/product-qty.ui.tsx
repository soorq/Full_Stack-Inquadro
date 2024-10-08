'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { useEffect, useState, useCallback, memo } from 'react';
import type { ProductClient } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { Minus, Plus } from '@phosphor-icons/react';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import dynamic from 'next/dynamic';

const CartWidget = dynamic(
    () => import('~&/src/features/cart-widget').then(cn => cn.CartWidget),
    { ssr: false }
);

const FavoriteWidget = dynamic(
    () =>
        import('~&/src/features/favorite-widget').then(cn => cn.FavoriteWidget),
    { ssr: false }
);

export const ProductQty = memo(
    ({ product }: { product: ProductClient | null }) => {
        const [qty, setQty] = useState<number>(1);
        const {
            products: cartProducts,
            updateQuantityFn,
            delFn
        } = useCartStore(state => state);

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
                if (product) {
                    if (newQty < 1) {
                        delFn(product.article);
                    } else {
                        updateQuantityFn(product.article, newQty);
                    }
                }
            },
            [product, updateQuantityFn, delFn]
        );

        const changeQty = (diff: number) => {
            setQty(prevState => {
                const newQty = Math.max(0, Math.min(99, prevState + diff));
                updateCartQuantity(newQty);
                return newQty;
            });
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newQty = Number(e.target.value);
            if (newQty >= 1 && newQty <= 99) {
                setQty(newQty);
                updateCartQuantity(newQty);
            } else if (newQty < 1) {
                setQty(0);
                if (product) {
                    updateCartQuantity(0);
                }
            } else if (e.target.value === '') {
                setQty(1);
                updateCartQuantity(1);
            }
        };

        if (!product) return null;

        const { totalCost, totalTileArea } = calculateTileMetrics(
            product.size ?? '',
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

                <div className="flex gap-1.5 w-full h-auto items-center">
                    <div
                        className={cn(
                            'flex gap-1.5 items-center',
                            isInCart ? 'md:flex-row w-full' : 'w-full'
                        )}
                    >
                        {isInCart && (
                            <div className="flex gap-1.5">
                                <Button
                                    onClick={() => changeQty(-1)}
                                    className="size-[50px]"
                                >
                                    <Minus weight="light" />
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
                                    <Plus weight="light" />
                                </Button>
                            </div>
                        )}

                        <CartWidget
                            product={product}
                            className="w-2/3"
                            qty={qty}
                        />
                        <FavoriteWidget
                            className="[&>svg]:fill-red-400"
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
