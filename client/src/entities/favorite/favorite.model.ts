import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { TypeFavoriteActions, TypeFavoriteStates } from './favorite.types';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { ProductClient } from '~&/src/entities/product';
import { StateCreator, create } from 'zustand';

function createFavoriteSlice() {
    const favoriteSlice: StateCreator<
        TypeFavoriteActions & TypeFavoriteStates,
        [['zustand/devtools', never], ['zustand/persist', unknown]],
        [],
        TypeFavoriteActions & TypeFavoriteStates
    > = set => ({
        products: [],

        addFn: (product: ProductClient) => {
            set(
                state => {
                    const existingProduct = state.products.find(
                        p => p.article === product.article
                    );

                    if (existingProduct) {
                        return state;
                    }

                    return {
                        products: [...state.products, product]
                    };
                },
                false,
                'addFn'
            );
        },

        delFn: (id: string) => {
            set(
                state => ({
                    products: state.products.filter(item => item.article !== id)
                }),
                false,
                'delFn'
            );
        }
    });

    return favoriteSlice;
}

const slice = createFavoriteSlice();
const withPersist = persist(slice, {
    name: 'favorite-store',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Favorite Service' });
const store = create(withDevtools);

export const useFavoriteStore = createSelectors(store);
