import { z } from 'zod';
import {
    FilterResponseSchema,
    QueryFiltersSchema,
    FiltersSchema
} from './filter.contract';

export type TypeFilters = z.infer<typeof FiltersSchema>;
export type TypeQueryFilters = z.infer<typeof QueryFiltersSchema>;
export type FilterResponse = z.infer<typeof FilterResponseSchema>;
export type FilterCategory = keyof Omit<
    z.infer<typeof FiltersSchema>,
    'prices'
>;
