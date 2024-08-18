import type { TypeFilters, TypeFilterActions } from './filter.types';
import { create, StateCreator } from 'zustand';

const createFiltersSlice: StateCreator<
    TypeFilters & TypeFilterActions,
    [],
    [],
    TypeFilters & TypeFilterActions
> = (set, get) => ({
    category: new Set<string>(),
    usage: new Set<string>(),
    available: new Set<string>(),
    plating: new Set<string>(),
    invoice: new Set<string>(),
    size: new Set<string>(),
    texture: new Set<string>(),
    shade: new Set<string>(),
    wimages: new Set<string>(),
    prices: {
        priceFrom: undefined,
        priceTo: undefined
    },

    setFilter: (name: keyof Omit<TypeFilters, 'prices'>, value: string) => {
        set(state => {
            const newSet = new Set(state[name]);
            newSet.add(value);
            return { [name]: newSet } as Pick<
                TypeFilters,
                keyof Omit<TypeFilters, 'prices'>
            >;
        });
    },

    removeFilter: (name: keyof Omit<TypeFilters, 'prices'>, value: string) => {
        set(state => {
            const newSet = new Set(state[name]);
            newSet.delete(value);
            return { [name]: newSet } as Pick<
                TypeFilters,
                keyof Omit<TypeFilters, 'prices'>
            >;        });
    },

    setPrices: (name: keyof TypeFilters['prices'], value: number) => {
        set(state => ({
            prices: { ...state.prices, [name]: value }
        }));
    },

    hasActiveFilters: () => {
        const {
            category,
            usage,
            available,
            plating,
            invoice,
            size,
            texture,
            shade,
            wimages,
            prices
        } = get();
        return (
            [
                category,
                usage,
                available,
                plating,
                invoice,
                size,
                texture,
                shade,
                wimages
            ].some(set => set.size > 0) ||
            (prices.priceFrom !== null && prices.priceTo !== null)
        );
    },

    resetFilters: () => {
        set(() => ({
            category: new Set<string>(),
            usage: new Set<string>(),
            available: new Set<string>(),
            plating: new Set<string>(),
            invoice: new Set<string>(),
            size: new Set<string>(),
            texture: new Set<string>(),
            shade: new Set<string>(),
            wimages: new Set<string>(),
            prices: {
                priceFrom: undefined,
                priceTo: undefined
            }
        }));
    }
});

export const useFiltersStore = create<TypeFilters & TypeFilterActions>(
    createFiltersSlice
);
