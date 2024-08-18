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
        quantity: 0,
        products: [], // Инициализируем как пустой массив

        addFn: (product: ProductClient) => {
            set(
                state => {
                    const updatedProducts = [...state.products, product];
                    return {
                        products: updatedProducts,
                        quantity: state.quantity + 1
                    };
                },
                false,
                'addFn'
            );
        },

        delFn: (id: string) => {
            set(
                state => {
                    const updatedProducts = state.products.filter(
                        item => item.article !== id
                    );
                    return {
                        products: updatedProducts,
                        quantity: state.quantity > 0 ? state.quantity - 1 : 0
                    };
                },
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
