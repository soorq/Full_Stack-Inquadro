import { ProductClient } from '~&/src/entities/product';

export type TypeFavoriteActions = {
    addFn: (product: ProductClient, qty: number) => void;
    delFn: (id: string) => void;
};

export type TypeFavoriteStates = {
    products: ProductClient[];
};
