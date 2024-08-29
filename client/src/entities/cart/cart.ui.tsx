'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrderSkeleton } from '~&/src/features/product/order';
import { ProductWithQuantity } from '~&/src/entities/product';
import { ShoppingCart } from '@phosphor-icons/react/dist/ssr';
import { Button } from '~&/src/shared/ui/button';
import { useCartStore } from './cart.model';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '~&/src/shared/ui/popover';

const ProductOrder = dynamic(
    () => import('~&/src/features/product/order').then(cm => cm.ProductOrder),
    {
        ssr: false,
        loading: () => <ProductOrderSkeleton />
    }
);

export const CartPreview = ({ isIcon = true }: { isIcon?: boolean }) => {
    const [focus, setFocus] = useState(false);
    const { products: cartProducts, updateQuantityFn } = useCartStore(
        state => ({
            products: state.products,
            updateQuantityFn: state.updateQuantityFn
        })
    );

    const handleQtyChange = (article: string, newQty: number) => {
        if (newQty >= 1 && newQty <= 99) {
            updateQuantityFn(article, newQty);
        }
    };

    return (
        <div className="flex data-[state=open]:flex-row justify-center h-full flex-col items-center gap-y-2.5 sm:gap-1">
            {isIcon ? (
                <Popover onOpenChange={setFocus}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-2 sm:px-0 hover:bg-transparent text-base font-normal data-[state=open]:z-30 data-[state=open]:relative data-[state=open]:text-white"
                        >
                            {cartProducts.length}
                            <ShoppingCart
                                className="stroke-1 data-[state=open]:fill-white"
                                weight="light"
                                size={24}
                            />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 max-w-[610px] max-h-[500px] h-full overflow-y-auto w-svw">
                        <ProductList
                            products={cartProducts}
                            onQtyChange={handleQtyChange}
                        />
                    </PopoverContent>
                </Popover>
            ) : (
                <ProductList
                    products={cartProducts}
                    onQtyChange={handleQtyChange}
                />
            )}

            {focus && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
            )}
        </div>
    );
};

interface ProductListProps {
    products: ProductWithQuantity[];
    onQtyChange: (article: string, qty: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onQtyChange }) => {
    return (
        <>
            {products.length ? (
                products.map(product => {
                    const { totalCost, totalTileArea } = calculateTileMetrics(
                        product.size,
                        +product.kit,
                        +product.price,
                        product.quantity
                    );

                    return (
                        <ProductOrder
                            key={`product-cart-${product.article}`}
                            href={'/order/podtverzhdenie-zakaza'}
                            totalTileArea={totalTileArea}
                            qty={product.quantity}
                            totalCost={totalCost}
                            product={product}
                            onQtyChange={newQty =>
                                onQtyChange(product.article, newQty)
                            }
                            isInCart={true}
                            context="cart"
                        />
                    );
                })
            ) : (
                <div className="w-full h-40 flex text-center justify-center flex-col items-center backdrop-blur-lg">
                    <h4 className="text-xl mb-1 font-medium">Корзина пустая</h4>
                    <p className="w-2/3 text-sm">
                        А скидок полно - забегайте посмотреть
                    </p>
                </div>
            )}
        </>
    );
};
