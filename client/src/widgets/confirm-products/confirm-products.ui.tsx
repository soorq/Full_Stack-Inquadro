'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrder } from '~&/src/features/product/order';
import { useCartStore } from '~&/src/entities/cart';
import { useShallow } from 'zustand/react/shallow';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export const ConfirmProducts = () => {
    const { products, updateQuantityFn, setTotal, delFn } = useCartStore(
        useShallow(({ products, updateQuantityFn, setTotal, delFn }) => ({
            products,
            updateQuantityFn,
            setTotal,
            delFn
        }))
    );

    useEffect(() => {
        if (products.length === 0) {
            redirect('/catalog');
        }
    }, [products]);

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
        const product = products.find(item => item.article === article);

        if (newQty < 1) {
            delFn(product?.article || '');
        }
        if (newQty >= 1 && newQty <= 99) {
            updateQuantityFn(article, newQty);
        }
    };

    return (
        <div className="flex flex-col gap-3 h-full mb-6 lg:w-7/12 xl:w-2/4">
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
                        className="sm:px-0"
                        context="confirm"
                        totalTileArea={totalTileArea}
                        totalCost={totalCost}
                    />
                );
            })}
        </div>
    );
};
