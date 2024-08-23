'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrder } from '~&/src/widgets/product';
import { useCartStore } from '~&/src/entities/cart';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

export const ConfirmProducts = () => {
    const { products, updateQuantityFn, setTotalPrice } = useCartStore(
        useShallow(({ products, updateQuantityFn, setTotalPrice }) => ({
            products,
            updateQuantityFn,
            setTotalPrice
        }))
    );

    const updateProductCosts = () => {
        products.forEach(product => {
            const { totalCost } = calculateTileMetrics(
                product.size,
                +product.kit,
                +product.price,
                product.quantity
            );
            setTotalPrice(product.article, totalCost);
        });
    };

    useEffect(() => {
        updateProductCosts();
    }, [products.length]);

    const handleQtyChange = (article: string, newQty: number) => {
        if (newQty >= 1 && newQty <= 99) {
            updateQuantityFn(article, newQty);
        }
    };

    return (
        <section className="h-full mb-10 mt-5 w-1/2">
            <div className="flex flex-col gap-3">
                {products.map(product => {
                    const { totalCost, totalTileArea } = calculateTileMetrics(
                        product.size,
                        +product.kit,
                        +product.price,
                        product.quantity
                    );

                    return (
                        <ProductOrder
                            key={`product-order-confirm-${product.quantity}-${product.slug}`}
                            onQtyChange={newQty =>
                                handleQtyChange(product.article, newQty)
                            }
                            qty={product.quantity}
                            product={product}
                            className="px-0"
                            context="confirm"
                            totalTileArea={totalTileArea}
                            totalCost={totalCost}
                        />
                    );
                })}
            </div>
        </section>
    );
};
