import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ProductActions, ProductState } from './product.types';
import { createSelectors } from '~&/src/shared/lib/zustand';
import { StateCreator, create } from 'zustand';

// Создаем срез состояния с выбором параметров
function createProductSlice() {
    const productSlice: StateCreator<
        ProductState & ProductActions,
        [['zustand/devtools', never], ['zustand/persist', unknown]],
        [],
        ProductState & ProductActions
    > = set => ({
        product: null,
        size: null,
        usage: null,
        shade: null,

        setSize: size => set({ size: size }, false, 'setSize'),
        setUsage: usage => set({ usage: usage }, false, 'setUsage'),
        setShade: shade => set({ shade: shade }, false, 'setShade'),
        setProduct: product => {
            set({ product });

            // Установите значения по умолчанию для размера, использования и оттенка
            const defaultSize = product.size[0] || null;
            const defaultUsage = product.usage[0] || null;
            const defaultShade = product.shade[0] || null;

            // set({
            //     size: defaultSize,
            //     usage: defaultUsage,
            //     shade: defaultShade
            // });
        },

        reset: () =>
            set(
                {
                    size: null,
                    usage: null,
                    shade: null
                },
                false,
                'reset'
            )
    });
    return productSlice;
}

// Применяем persist и devtools к состоянию
const slice = createProductSlice();
const withPersist = persist(slice, {
    name: 'product-options',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Product  Service' });
const store = create(withDevtools);

// Экспортируем hooks для использования store
export const useProductStore = createSelectors(store);
