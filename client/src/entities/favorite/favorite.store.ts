import { TypeActionsStore, TypeStatesStore } from './favorite.types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

export const useFavoriteStore = create<TypeStatesStore & TypeActionsStore>()(
    persist(
        (set, get) => ({
            quantity: 0,
            products: [],

            addFn: product => {
                set(state => {
                    const updatedProducts = [...state.products, product];

                    return {
                        products: updatedProducts,
                        quantity: state.quantity + 1
                    };
                });
            },

            delFn: (id: string) => {
                set(state => {
                    const updatedProducts = state.products.filter(
                        item => item.article !== id
                    );

                    return {
                        products: updatedProducts,
                        quantity: state.quantity > 0 ? state.quantity - 1 : 0
                    };
                });
            }
        }),
        {
            name: '_{cart}_store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
