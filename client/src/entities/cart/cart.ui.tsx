'use client';

import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';
import { ProductOrderSkeleton } from '~&/src/features/product/order';
import { ProductWithQuantity } from '~&/src/entities/product';
import { ShoppingCart } from '@phosphor-icons/react/dist/ssr';
import { Button } from '~&/src/shared/ui/button';
import { useCartStore } from './cart.model';
import dynamic from 'next/dynamic';
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
    const {
        products: cartProducts,
        updateQuantityFn,
        setOpenCart,
        delFn,
        open
    } = useCartStore(state => ({
        open: state.open,
        products: state.products,
        delFn: state.delFn,
        setOpenCart: state.setOpenCart,
        updateQuantityFn: state.updateQuantityFn
    }));

    const handleQtyChange = (article: string, newQty: number) => {
        const product = cartProducts.find(item => item.article === article);

        if (newQty < 1) {
            delFn(product?.article || '');
        }
        if (newQty >= 1 && newQty <= 99) {
            updateQuantityFn(article, newQty);
        }
    };

    const handleCloseCart = () => {
        setOpenCart(false);
    };

    return (
        <div className="flex data-[state=open]:flex-row justify-center h-full flex-col items-center gap-y-2.5 sm:gap-1">
            {isIcon ? (
                <Popover
                    onOpenChange={setOpenCart}
                    defaultOpen={false}
                    open={open}
                >
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
                    <PopoverContent className="p-0 hidden md:block max-w-[610px] max-h-[525px] h-full overflow-y-auto scroll-none w-svw">
                        <ProductList
                            products={cartProducts}
                            onQtyChange={handleQtyChange}
                            handleCloseCart={handleCloseCart}
                        />
                    </PopoverContent>
                </Popover>
            ) : (
                <ProductList
                    products={cartProducts}
                    onQtyChange={handleQtyChange}
                />
            )}

            {open && (
                <div className="fixed hidden md:block top-0 left-0 bottom-0 right-0 bg-black/50 z-20" />
            )}
        </div>
    );
};

interface ProductListProps {
    products: ProductWithQuantity[];
    onQtyChange: (article: string, qty: number) => void;
    handleCloseCart?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    onQtyChange,
    handleCloseCart
}) => {
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
                            handleCloseCart={handleCloseCart}
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
