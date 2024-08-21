import { z } from 'zod';
import { ProductsClientSchema } from '~&/src/entities/product/product.contracts';

export const FiltersSchema = z.object({
    category: z.set(z.string()),
    usage: z.set(z.string()),
    availability: z.set(z.string()),
    plating: z.set(z.string()),
    invoice: z.set(z.string()),
    size: z.set(z.string()),
    texture: z.set(z.string()),
    shade: z.set(z.string()),
    images: z.set(z.string())
});

export const QueryFiltersSchema = z.object({
    category: z.string().optional(),
    usage: z.string().optional(),
    availability: z.string().optional(),
    plating: z.string().optional(),
    invoice: z.string().optional(),
    size: z.string().optional(),
    texture: z.string().optional(),
    shade: z.string().optional()
});

const FilterMetaSchema = z.object({
    itemsPerPage: z.number(),
    totalItems: z.number(),
    currentPage: z.number(),
    totalPages: z.number(),
    sortBy: z.array(z.tuple([z.string(), z.enum(['ASC', 'DESC'])])),
    filter: z.record(z.string(), z.string().or(z.array(z.string()))).optional()
});

const FilterLinksSchema = z.object({
    current: z.string().url(),
    next: z.string().url().optional(),
    last: z.string().url().optional()
});

export const FilterResponseSchema = z.object({
    data: ProductsClientSchema,
    meta: FilterMetaSchema,
    links: FilterLinksSchema
});

export const FilterQuerySchema = z.object({
    filters: z.record(z.string().optional()).optional()
});
