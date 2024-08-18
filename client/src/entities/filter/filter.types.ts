import {
    FiltersSchema,
    PriceSchema,
    QueryFiltersSchema
} from './filter.contracts';
import { z } from 'zod';

export type TypeFilters = z.infer<typeof FiltersSchema>;
export type TypeQueryFilters = z.infer<typeof QueryFiltersSchema>;
export type TypePrice = z.infer<typeof PriceSchema>;

export type TypeFilterActions = {
    setFilter: (name: keyof Omit<TypeFilters, 'prices'>, value: string) => void;
    removeFilter: (
        name: keyof Omit<TypeFilters, 'prices'>,
        value: string
    ) => void;
    setPrices: (name: keyof TypeFilters['prices'], value: number) => void;
    hasActiveFilters: () => boolean;
    resetFilters: () => void;
};
