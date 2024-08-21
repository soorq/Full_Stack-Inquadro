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
    availability: new Set<string>(),
    plating: new Set<string>(),
    invoice: new Set<string>(),
    size: new Set<string>(),
    texture: new Set<string>(),
    shade: new Set<string>(),
    images: new Set<string>(),

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
            >;
        });
    },

    hasActiveFilters: () => {
        const {
            category,
            usage,
            availability,
            plating,
            invoice,
            size,
            texture,
            shade,
            images
        } = get();
        return [
            category,
            usage,
            availability,
            plating,
            invoice,
            size,
            texture,
            shade,
            images
        ].some(set => set.size > 0);
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
            images: new Set<string>()
        }));
    }
});

export const useFiltersStore = create<TypeFilters & TypeFilterActions>(
    createFiltersSlice
);
