import type { ProductClient } from '~&/src/entities/product';

export type TypeCartActions = {
    addFn: (product: ProductClient) => void;
    delFn: (id: string) => void;
};

export type TypeCartStates = {
    quantity: number;
    products: ProductClient[];
};
