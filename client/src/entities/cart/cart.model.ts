import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { TypeCartStates, TypeCartActions } from './cart.types';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { type StateCreator, create } from 'zustand';
import { calculateTileMetrics } from '~&/src/shared/lib/calculate-price';

const cartSlice: StateCreator<
    TypeCartActions & TypeCartStates,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    TypeCartActions & TypeCartStates
> = (set, get) => ({
    products: [],

    addFn: (product, qty = 1) => {
        set(state => {
            const updatedProducts = state.products.map(item => {
                if (item.article === product.article) {
                    const newQuantity = item.quantity + qty;

                    const { totalCost, totalTileArea } = calculateTileMetrics(
                        item.size,
                        +item.kit,
                        item.price,
                        newQuantity
                    );

                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: totalCost,
                        totalArea: totalTileArea
                    };
                }
                return item;
            });

            if (state.products.some(item => item.article === product.article)) {
                return { products: updatedProducts };
            }

            const { totalCost, totalTileArea } = calculateTileMetrics(
                product.size,
                +product.kit,
                product.price,
                qty
            );

            return {
                products: [
                    ...updatedProducts,
                    {
                        ...product,
                        quantity: qty,
                        totalPrice: totalCost,
                        totalArea: totalTileArea
                    }
                ]
            };
        });
    },

    setTotal: (article, totalPrice, area) => {
        set(state => ({
            products: state.products.map(product =>
                product.article === article
                    ? { ...product, totalPrice, totalArea: area }
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
    },

    getCartSummary: () => {
        const products = get().products;
        const totalPrice = products.reduce(
            (total, product) => total + (product.totalPrice || 0),
            0
        );
        const totalQuantity = products.reduce(
            (total, product) => total + (product.quantity || 0),
            0
        );

        const totalArea = products.reduce(
            (total, product) => total + (product.totalArea || 0),
            0
        );

        return {
            sqmetrs: totalArea,
            price: totalPrice,
            quantity: totalQuantity,
            products
        };
    },

    clearCart: () => {
        set({ products: [] });
    }
});

const withPersist = persist(cartSlice, {
    name: 'cart-store',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Cart Service' });
const store = create(withDevtools);

export const useCartStore = createSelectors(store);
