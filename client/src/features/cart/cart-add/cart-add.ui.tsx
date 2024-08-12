'use client';

import { Button } from '~&/src/shared/ui/button';
import { useCartStore } from '~&/src/entities/cart';
import { useShallow } from 'zustand/react/shallow';
import { ProductSearchDto } from '~&/src/shared/api/api.types';

export const CartAdd = ({ product }: { product: ProductSearchDto }) => {
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
