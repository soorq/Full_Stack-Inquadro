'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrder } from '~&/src/features/product/order';
import { useCartStore } from '~&/src/entities/cart';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

export const ConfirmProducts = () => {
    const { products, updateQuantityFn, setTotal } = useCartStore(
        useShallow(({ products, updateQuantityFn, setTotal }) => ({
            products,
            updateQuantityFn,
            setTotal
        }))
    );

    const updateProductCosts = () => {
        products.forEach(product => {
            const { totalCost, totalTileArea } = calculateTileMetrics(
                product.size,
                +product.kit,
                +product.price,
                product.quantity
            );
            setTotal(product.article, totalCost, totalTileArea);
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
        <div className="flex flex-col gap-3 h-full mb-10 lg:w-7/12 xl:w-2/4">
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
    );
};
