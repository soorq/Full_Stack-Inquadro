import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import type { ProductState, ProductActions } from './product.types';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { transformFromApi } from './product.lib';
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

        setProductClient: (product, slug) => {
            const product_client = transformFromApi(product);

            if (Array.isArray(product.slug)) {
                const id = product.slug
                    .filter(el => el.value === slug)
                    .map(el => el.id)[0];

                set({
                    currentId: id
                });
            }

            set({
                product_client
            });
        },

        setProductApi: product_api =>
            set({
                product_api
            }),

        setCurrentId: id => {
            set(state => {
                const product_api = state.product_api;
                if (product_api) {
                    const product_client = transformFromApi(product_api, id);
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
