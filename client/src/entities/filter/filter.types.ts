import { z } from 'zod';
import {
    FilterResponseSchema,
    QueryFiltersSchema,
    FiltersSchema
} from './filter.contracts';

export type TypeFilters = z.infer<typeof FiltersSchema>;
export type TypeQueryFilters = z.infer<typeof QueryFiltersSchema>;
export type FilterResponse = z.infer<typeof FilterResponseSchema>;
export type FilterCategory = keyof Omit<
    z.infer<typeof FiltersSchema>,
    'prices'
>;

export type TypeFilterActions = {
    setFilter: (name: keyof Omit<TypeFilters, 'prices'>, value: string) => void;
    removeFilter: (
        name: keyof Omit<TypeFilters, 'prices'>,
        value: string
    ) => void;
    hasActiveFilters: () => boolean;
    resetFilters: () => void;
};
