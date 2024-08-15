import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { TypeCartStates, TypeCartActions } from './cart.types';
import type { ProductClient } from '~&/src/entities/product';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { type StateCreator, create } from 'zustand';

function createCartSlice() {
    const cartSlice: StateCreator<
        TypeCartActions & TypeCartStates,
        [['zustand/devtools', never], ['zustand/persist', unknown]],
        [],
        TypeCartActions & TypeCartStates
    > = set => ({
        quantity: 0,
        products: [], // Инициализируем как пустой массив

        addFn: (product: ProductClient) => {
            set(
                state => {
                    const updatedProducts = [...state.products, product];

                    // Сохраняем в localStorage
                    localStorage.setItem(
                        'cart_products',
                        JSON.stringify(updatedProducts)
                    );

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

                    // Обновляем localStorage
                    localStorage.setItem(
                        'cart_products',
                        JSON.stringify(updatedProducts)
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

    return cartSlice;
}

// Применяем persist и devtools к состоянию
const slice = createCartSlice();
const withPersist = persist(slice, {
    name: 'cart-store', // Название для сохранения в localStorage
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Cart Service' });
const store = create(withDevtools);

// Экспортируем hooks для использования store
export const useCartStore = createSelectors(store);
