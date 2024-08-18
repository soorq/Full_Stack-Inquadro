'use client';

import { useCartStore } from '~&/src/entities/cart';
import { Button } from '~&/src/shared/ui/button';

export const CartDel = ({ id }: { id: string }) => {
    const { delFn } = useCartStore(state => state);

    const handlerFn = () => {
        delFn(id);
    };

    return (
        <Button
            onClick={handlerFn}
            className="h-[50px] w-full text-lg"
            type="button"
        >
            В корзине
        </Button>
    );
};
