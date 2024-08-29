import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import type { ProductState, ProductActions } from './product.types';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { transformProductClientDto } from './product.lib';
import { StateCreator, create } from 'zustand';

function createProductSlice(): StateCreator<
    ProductState & ProductActions,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [],
    ProductState & ProductActions
> {
    return set => ({
        product_api: null,
        product_client: null,
        currentId: null,

        setProductClient: product => {
            const product_client = transformProductClientDto(product);
            set({
                product_client
            });
        },

        setProductApi: product_api =>
            set({
                product_api
            }),

        setCurrentId: (id: number) => {
            set(state => {
                const product_api = state.product_api;
                if (product_api) {
                    const product_client = transformProductClientDto(
                        product_api,
                        id
                    );
                    return {
                        currentId: id,
                        product_client
                    };
                }

                return {
                    currentId: id,
                    product_client: null
                };
            });
        },

        reset: () =>
            set({
                product_client: null,
                product_api: null,
                currentId: null
            })
    });
}

const slice = createProductSlice();
const withPersist = persist(slice, {
    name: 'product-options',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Product Service' });
const store = create(withDevtools);

export const useProductStore = createSelectors(store);
