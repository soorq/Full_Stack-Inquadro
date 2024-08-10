import type { TypeActionsStore, TypeStatesStore } from './cart.types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

export const useCartStore = create<TypeStatesStore & TypeActionsStore>()(
    persist(
        (set, get) => ({
            total: 0
        }),
        {
            name: '_{cart}_store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
