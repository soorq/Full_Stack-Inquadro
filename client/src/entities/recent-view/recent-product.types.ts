import type { ProductClient } from '~&/src/entities/product';

export type TypeRecentProductsStates = {
    recentlyViewed: ProductClient[];
};

export type TypeRecentProductsActions = {
    addRecentProduct: (product: ProductClient | []) => void;
    clearRecentProducts: () => void;
};
