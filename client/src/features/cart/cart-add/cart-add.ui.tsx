'use client';

import { ProductClient } from '~&/src/entities/product';
import { useCartStore } from '~&/src/entities/cart';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '~&/src/shared/ui/button';

export const CartAdd = ({ product }: { product: ProductClient }) => {
    const { addFn } = useCartStore(useShallow(({ addFn }) => ({ addFn })));

    const handlerFn = () => {
        addFn(product);
    };

    return (
        <Button
            onClick={handlerFn}
            className="h-12 max-w-[360px] w-full text-lg"
            type="submit"
        >
            Добавить в корзину
        </Button>
    );
};
