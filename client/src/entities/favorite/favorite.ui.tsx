'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrder } from '~&/src/widgets/product';
import { useCartStore } from '~&/src/entities/cart';
import { useFavoriteStore } from './favorite.model';
import { Button } from '~&/src/shared/ui/button';
import { Heart } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '~&/src/shared/ui/popover';
import { ProductClient } from '~&/src/entities/product';

export const FavoritePreview = ({ isIcon = true }: { isIcon?: boolean }) => {
    const { products: fav_products } = useFavoriteStore(state => state);
    const {
        addFn: addToCart,
        products: cart_products,
        updateQuantityFn
    } = useCartStore(state => state);

    const handleQtyChange = (article: string, newQty: number) => {
        if (newQty >= 1 && newQty <= 99) {
            updateQuantityFn(article, newQty);
        }
    };

    const handleAddToCart = (article: string, qty: number = 1) => {
        const product = fav_products.find(item => item.article === article);
        if (product) {
            const existingProduct = cart_products.find(
                item => item.article === article
            );
            if (existingProduct) {
                const newQty = existingProduct.quantity + qty;
                handleQtyChange(article, newQty);
            } else {
                addToCart(product, qty);
            }
        }
    };

    const isProductInCart = (article: string) => {
        return cart_products.some(item => item.article === article);
    };

    const getProductQty = (article: string) => {
        const cartProduct = cart_products.find(
            item => item.article === article
        );
        return cartProduct ? cartProduct.quantity : 1;
    };

    return (
        <div className="flex items-center data-[state=open]:flex-row  justify-center h-full flex-col gap-1">
            {isIcon ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-2 px-0 hover:bg-transparent text-base font-normal data-[state=open]:z-30 data-[state=open]:relative data-[state=open]:text-white"
                        >
                            {fav_products.length || 0}
                            <Heart className="stroke-1 data-[state=open]:fill-white" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 max-w-[610px] w-svw max-h-[500px] h-full overflow-y-auto">
                        <FavoriteList
                            favProducts={fav_products}
                            getProductQty={getProductQty}
                            isProductInCart={isProductInCart}
                            handleAddToCart={handleAddToCart}
                            handleQtyChange={handleQtyChange}
                        />
                    </PopoverContent>
                </Popover>
            ) : (
                <div className="w-full">
                    <FavoriteList
                        favProducts={fav_products}
                        getProductQty={getProductQty}
                        isProductInCart={isProductInCart}
                        handleAddToCart={handleAddToCart}
                        handleQtyChange={handleQtyChange}
                    />
                </div>
            )}
            <div className="data-[state=open]:fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
        </div>
    );
};

interface FavoriteListProps {
    favProducts: ProductClient[];
    isProductInCart: (article: string) => boolean;
    getProductQty: (article: string) => number;
    handleQtyChange: (article: string, qty: number) => void;
    handleAddToCart: (article: string, qty: number) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
    favProducts,
    isProductInCart,
    getProductQty,
    handleQtyChange,
    handleAddToCart
}) => {
    return (
        <>
            {favProducts.map(product => {
                const isInCart = isProductInCart(product.article);
                const qty = getProductQty(product.article);
                const { totalCost, totalTileArea } = calculateTileMetrics(
                    product.size,
                    +product.kit,
                    +product.price,
                    qty
                );

                return (
                    <ProductOrder
                        key={`favorite-order-${product.article}`}
                        onQtyChange={newQty =>
                            handleQtyChange(product.article, newQty)
                        }
                        onAddToCart={() => handleAddToCart(product.article, 1)}
                        totalTileArea={totalTileArea}
                        totalCost={totalCost}
                        isInCart={isInCart}
                        context="favorites"
                        product={product}
                        qty={qty}
                    />
                );
            })}
        </>
    );
};
