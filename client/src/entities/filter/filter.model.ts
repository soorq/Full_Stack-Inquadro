import type { TypeFilterActions, TypeFilterState } from './filter.types';
import { filterT } from '~&/src/shared/api/filter';
import { create, StateCreator } from 'zustand';

const createFiltersSlice: StateCreator<
    TypeFilterState & TypeFilterActions,
    [],
    [],
    TypeFilterState & TypeFilterActions
> = (set, get) => ({
    category: '',
    usage: new Set<string>(),
    availability: new Set<string>(),
    plating: new Set<string>(),
    invoice: new Set<string>(),
    size: new Set<string>(),
    texture: new Set<string>(),
    shade: new Set<string>(),
    images: new Set<string>(),

    isOpenCategory: false,
    isOpenFilters: false,

    setFilter: (
        name: keyof Omit<filterT.TypeFilters, 'prices'>,
        value: string
    ) => {
        set(state => {
            if (name === 'category') {
                return { category: value };
            }
            const newSet = new Set(state[name]);
            newSet.add(value);
            return { [name]: newSet } as unknown as Pick<
                filterT.TypeFilters,
                keyof Omit<filterT.TypeFilters, 'prices'>
            >;
        });
    },

    removeFilter: (
        name: keyof Omit<filterT.TypeFilters, 'prices'>,
        value: string
    ) => {
        set(state => {
            if (name === 'category') {
                return { category: value };
            }
            const newSet = new Set(state[name]);
            newSet.delete(value);
            return { [name]: newSet } as unknown as Pick<
                filterT.TypeFilters,
                keyof Omit<filterT.TypeFilters, 'prices'>
            >;
        });
    },

    setOpenCategory: () =>
        set(state => ({
            isOpenCategory: !state.isOpenCategory,
            isOpenFilters: false
        })),
    setOpenFilters: () =>
        set(state => ({
            isOpenFilters: !state.isOpenFilters,
            isOpenCategory: false
        })),
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

        return (
            category !== '' ||
            usage.size > 0 ||
            availability.size > 0 ||
            plating.size > 0 ||
            invoice.size > 0 ||
            size.size > 0 ||
            texture.size > 0 ||
            shade.size > 0 ||
            images.size > 0
        );
    },

    resetFilters: () => {
        set(() => ({
            category: '',
            usage: new Set<string>(),
            availability: new Set<string>(),
            plating: new Set<string>(),
            invoice: new Set<string>(),
            size: new Set<string>(),
            texture: new Set<string>(),
            shade: new Set<string>(),
            images: new Set<string>()
        }));
    }
});

export const useFiltersStore = create<TypeFilterState & TypeFilterActions>(
    createFiltersSlice
);
