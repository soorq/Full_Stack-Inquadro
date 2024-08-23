import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { type StateCreator, create } from 'zustand';
import {
    TypeRecentProductsActions,
    TypeRecentProductsStates
} from './recent-product.types';

function createRecentViewSlice() {
    const recentProductsSlice: StateCreator<
        TypeRecentProductsStates & TypeRecentProductsActions,
        [['zustand/devtools', never], ['zustand/persist', unknown]],
        [],
        TypeRecentProductsStates & TypeRecentProductsActions
    > = set => ({
        recentlyViewed: [],

        addRecentProduct: product => {
            set(
                state => {
                    if (
                        !product ||
                        Array.isArray(product) ||
                        typeof product !== 'object' ||
                        !('article' in product)
                    ) {
                        return { recentlyViewed: state.recentlyViewed };
                    }

                    const updatedProducts = state.recentlyViewed.filter(
                        item =>
                            item !== null && item?.article !== product?.article
                    );

                    updatedProducts.unshift(product);

                    if (updatedProducts.length > 6) {
                        updatedProducts.pop();
                    }

                    return { recentlyViewed: updatedProducts };
                },
                false,
                'addRecentProduct'
            );
        },

        clearRecentProducts: () => {
            set({ recentlyViewed: [] }, false, 'clearRecentProducts');
        }
    });

    return recentProductsSlice;
}

const slice = createRecentViewSlice();
const withPersist = persist(slice, {
    name: 'recent-products',
    storage: createJSONStorage(() => sessionStorage)
});
const withDevtools = devtools(withPersist, { name: 'Recent Products Service' });
const store = create(withDevtools);

export const useRecentViewStore = createSelectors(store);
