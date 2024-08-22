import type {
    ProductClient,
    ProductWithQuantity
} from '~&/src/entities/product';

export type TypeCartActions = {
    addFn: (product: ProductClient, qty: number) => void;
    delFn: (id: string) => void;
    updateQuantityFn: (id: string, quantity: number) => void;
};

export type TypeCartStates = {
    products: ProductWithQuantity[];
};
