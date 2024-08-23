import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { TypeCartStates, TypeCartActions } from './cart.types';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { type StateCreator, create } from 'zustand';

const cartSlice: StateCreator<
    TypeCartActions & TypeCartStates,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    TypeCartActions & TypeCartStates
> = (set, get) => ({
    products: [],

    addFn: (product, qty = 1) => {
        set(state => {
            const existingProduct = state.products.find(
                item => item.article === product.article
            );

            if (existingProduct) {
                const updatedProducts = state.products.map(item =>
                    item.article === product.article
                        ? {
                              ...item,
                              quantity: item.quantity + qty,
                              totalPrice: item.price * qty
                          }
                        : item
                );
                return {
                    products: updatedProducts
                };
            }

            return {
                products: [
                    ...state.products,
                    { ...product, quantity: qty, totalPrice: 0 }
                ]
            };
        });
    },

    setTotalPrice: (article, totalPrice) => {
        set(state => ({
            products: state.products.map(product =>
                product.article === article
                    ? { ...product, totalPrice }
                    : product
            )
        }));
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
                            ? {
                                  ...item,
                                  quantity: item.quantity - qty,
                                  totalPrice: item.totalPrice - item.price * qty
                              }
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
                item.article === id
                    ? {
                          ...item,
                          quantity: qty,
                          totalPrice: item.price * qty
                      }
                    : item
            );
            return {
                products: updatedProducts
            };
        });
    },

    getTotalCount: () => {
        const products = get().products;
        return products.reduce((total, product) => {
            return total + Math.round(product.totalPrice);
        }, 0);
    }
});

const withPersist = persist(cartSlice, {
    name: 'cart-store',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Cart Service' });
const store = create(withDevtools);

export const useCartStore = createSelectors(store);
