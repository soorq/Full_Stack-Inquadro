import { ProductClient } from '~&/src/entities/product';

export type TypeFavoriteActions = {
    addFn: (product: ProductClient, qty: number) => void;
    setOpen: (open: boolean) => void;
    delFn: (id: string) => void;
};

export type TypeFavoriteStates = {
    products: ProductClient[];
    open: boolean;
};
