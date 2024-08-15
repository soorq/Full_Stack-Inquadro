import type { ProductClient } from '~&/src/entities/product';

export type TypeFavoriteActions = {
    addFn: (product: ProductClient) => void;
    delFn: (id: string) => void;
};

export type TypeFavoriteStates = {
    quantity: number;
    products: ProductClient[];
};
