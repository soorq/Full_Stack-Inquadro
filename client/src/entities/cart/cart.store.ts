import type { TypeActionsStore, TypeStatesStore } from './cart.types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

export const useCartStore = create<TypeStatesStore & TypeActionsStore>()(
    persist(
        (set, get) => ({
            quantity: 0,
            products: [],

            addFn: product => {
                set(state => {
                    const updatedProducts = [...state.products, product];

                    localStorage.setItem(
                        'cart_products',
                        JSON.stringify(updatedProducts)
                    );

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
                    localStorage.setItem(
                        'cart_products',
                        JSON.stringify(updatedProducts)
                    ); // Обновляем sessionStorage
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
