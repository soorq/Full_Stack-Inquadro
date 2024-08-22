'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductWithQuantity } from '~&/src/entities/product';
import { ProductOrder } from '~&/src/widgets/product';
import { Button } from '~&/src/shared/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from './cart.model';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '~&/src/shared/ui/popover';

export const CartPreview = ({ isIcon = true }: { isIcon?: boolean }) => {
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
        <div className="flex data-[state=open]:flex-row justify-center h-full flex-col items-center gap-1">
            {isIcon ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-2 px-0 hover:bg-transparent text-base font-normal data-[state=open]:z-30 data-[state=open]:relative data-[state=open]:text-white"
                        >
                            {cartProducts.length}
                            <ShoppingCart className="stroke-1" />
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
                <div className="w-full">
                    <ProductList
                        products={cartProducts}
                        onQtyChange={handleQtyChange}
                    />
                </div>
            )}

            <div className="data-[state=open]:fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
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
            {products.map(product => {
                const { totalCost, totalTileArea } = calculateTileMetrics(
                    product.size,
                    +product.kit,
                    +product.price,
                    product.quantity
                );

                return (
                    <ProductOrder
                        key={`product-cart-${product.article}`}
                        product={product}
                        qty={product.quantity}
                        onQtyChange={newQty =>
                            onQtyChange(product.article, newQty)
                        }
                        totalCost={totalCost}
                        totalTileArea={totalTileArea}
                        isInCart={true}
                        context="cart"
                        onProceedToOrder={() => {}}
                    />
                );
            })}
        </>
    );
};
