'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrder } from '~&/src/features/product/order';
import { ProductClient } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { useFavoriteStore } from './favorite.model';
import { Button } from '~&/src/shared/ui/button';
import { Heart } from '@phosphor-icons/react';
import { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '~&/src/shared/ui/popover';

export const FavoritePreview = ({ isIcon = true }: { isIcon?: boolean }) => {
    const { products: fav_products, setOpen: setFavoriteOpen, open: favorite_open } = useFavoriteStore(state => state);
    const {
        addFn: addToCart,
        products: cart_products,
        setOpenCart,
        updateQuantityFn, delFn
    } = useCartStore(state => state);

    const handleQtyChange = (article: string, newQty: number) => {
        const product = fav_products.find(item => item.article === article);

        if (newQty < 1) {
            delFn(product?.article || '')
        }
        if (newQty >= 1 && newQty <= 99) {
            updateQuantityFn(article, newQty);
        }
    };

    const handleAddToCart = (article: string, qty: number = 1) => {
        const product = fav_products.find(item => item.article === article);
        if (product) {
            addToCart(product, qty);
            setFavoriteOpen(false);
            setOpenCart(true);
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
                <Popover onOpenChange={setFavoriteOpen} defaultOpen={false} open={favorite_open}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="gap-2 sm:px-0 px-0 hover:bg-transparent text-base font-normal data-[state=open]:z-30 data-[state=open]:relative data-[state=open]:text-white"
                        >
                            {fav_products.length || 0}
                            <Heart
                                className="stroke-1 data-[state=open]:fill-white"
                                weight="light"
                                size={24}
                            />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 max-w-[610px] max-h-[525px] h-full overflow-y-auto scroll-none w-svw">
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
                <FavoriteList
                    favProducts={fav_products}
                    getProductQty={getProductQty}
                    isProductInCart={isProductInCart}
                    handleAddToCart={handleAddToCart}
                    handleQtyChange={handleQtyChange}
                />
            )}
            {favorite_open && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
            )}
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
            {favProducts.length ? (
                favProducts.map(product => {
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
                            onAddToCart={() =>
                                handleAddToCart(product.article, 1)
                            }
                            totalTileArea={totalTileArea}
                            totalCost={totalCost}
                            isInCart={isInCart}
                            context="favorites"
                            product={product}
                            qty={qty}
                        />
                    );
                })
            ) : (
                <div className="w-full h-40 flex text-center justify-center flex-col items-center backdrop-blur-lg">
                    <h4 className="text-xl mb-1 font-medium">
                        Сохраняйте здесь товары
                    </h4>
                    <p className="w-2/3 text-sm">
                        Чтобы следить за ценой и не терять то, что понравилось
                    </p>
                </div>
            )}
        </>
    );
};
