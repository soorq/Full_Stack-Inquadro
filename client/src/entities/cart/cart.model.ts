import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { TypeCartStates, TypeCartActions } from './cart.types';
import type { ProductClient } from '~&/src/entities/product';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { type StateCreator, create } from 'zustand';

const cartSlice: StateCreator<
    TypeCartActions & TypeCartStates,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    TypeCartActions & TypeCartStates
> = set => ({
    products: [],

    addFn: (product: ProductClient, qty: number = 1) => {
        set(state => {
            const existingProduct = state.products.find(
                item => item.article === product.article
            );

            if (existingProduct) {
                const updatedProducts = state.products.map(item =>
                    item.article === product.article
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
                return {
                    products: updatedProducts
                };
            }

            return {
                products: [...state.products, { ...product, quantity: qty }]
            };
        });
    },

    delFn: (id: string, qty: number = 1) => {
        set(state => {
            const existingProduct = state.products.find(
                item => item.article === id
            );

            if (existingProduct) {
                if (existingProduct.quantity > qty) {
                    const updatedProducts = state.products.map(item =>
                        item.article === id
                            ? { ...item, quantity: item.quantity - qty }
                            : item
                    );
                    return {
                        products: updatedProducts
                    };
                } else {
                    const updatedProducts = state.products.filter(
                        item => item.article !== id
                    );
                    return {
                        products: updatedProducts
                    };
                }
            }

            return {
                products: state.products
            };
        });
    },

    updateQuantityFn: (id: string, qty: number) => {
        set(state => {
            const updatedProducts = state.products.map(item =>
                item.article === id ? { ...item, quantity: qty } : item
            );
            return {
                products: updatedProducts
            };
        });
    }
});

const withPersist = persist(cartSlice, {
    name: 'cart-store',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Cart Service' });
const store = create(withDevtools);

export const useCartStore = createSelectors(store);
