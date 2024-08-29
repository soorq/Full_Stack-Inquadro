import type {
    ProductClient,
    ProductWithQuantity
} from '~&/src/entities/product';

export type TypeCartActions = {
    addFn: (product: ProductClient, qty: number) => void;
    delFn: (id: string) => void;
    updateQuantityFn: (id: string, quantity: number) => void;
    getTotalCount: () => void;
    setTotal: (product: string, price: number, area: number) => void;
    clearCart: () => void;
    getCartSummary: () => {
        price: number;
        quantity: number;
        sqmetrs: number;
        products: ProductWithQuantity[];
    };
};

export type TypeCartStates = {
    products: ProductWithQuantity[];
};
