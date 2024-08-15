import {
    FiltersSchema,
    PriceSchema,
    QueryFiltersSchema
} from './filter.contract';
import { z } from 'zod';

export type TypeFilters = z.infer<typeof FiltersSchema>;
export type TypeQueryFilters = z.infer<typeof QueryFiltersSchema>;
export type TypePrice = z.infer<typeof PriceSchema>;

export interface IReturnFilter extends TypeFilters {
    setPrices: (name: keyof TypePrice, value: number) => void;
    setFilter: (name: keyof Omit<TypeFilters, 'prices'>, value: string) => void;
}
