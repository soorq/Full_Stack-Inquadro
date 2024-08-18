import { z } from 'zod';

export const ProductFilterSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    limit: z.number().min(1).default(20),
    offset: z.number().min(0).default(0),
    filters: z.record(z.string().optional())
});

const dynamicFieldSchema = z.union([
    z.string(),
    z.array(
        z.object({
            id: z.number(),
            value: z.string()
        })
    )
]);

export const ProductApiSchema = z.object({
    name: z.string(),
    category: dynamicFieldSchema,
    availability: dynamicFieldSchema,
    usage: dynamicFieldSchema,
    image: dynamicFieldSchema,
    plating: dynamicFieldSchema,
    texture: dynamicFieldSchema,
    invoice: dynamicFieldSchema,
    size: dynamicFieldSchema,
    country: dynamicFieldSchema,
    price: dynamicFieldSchema,
    manufacturing: dynamicFieldSchema,
    kit: dynamicFieldSchema,
    shade: dynamicFieldSchema,
    article: dynamicFieldSchema,
    slug: dynamicFieldSchema
});

export const ProductClientSchema = z.object({
    name: z.string(),
    category: z.string(),
    availability: z.string(),
    usage: z.string(),
    image: z.string(),
    plating: z.string(),
    texture: z.string(),
    invoice: z.string(),
    size: z.string(),
    country: z.string(),
    price: z.string(),
    manufacturing: z.string(),
    kit: z.string(),
    shade: z.string(),
    article: z.string(),
    slug: z.string()
});

export const ProductFilterQuerySchema = z.object({
    // minPrice: z.string().optional(),  // maxPrice: z.string().optional(),
    filters: z.record(z.string().optional()).optional()
});

export const ProductSearchSchema = ProductClientSchema.extend({
    id: z.string()
});

export const ProductsSchema = z.map(z.string(), ProductClientSchema);

export const ProductsApiSchema = z.array(ProductApiSchema);

export const ProductsClientSchema = z.array(ProductClientSchema);

export const ProductsSearchSchema = z.array(ProductSearchSchema);

const FilterMetaSchema = z.object({
    itemsPerPage: z.number(),
    totalItems: z.number(),
    currentPage: z.number(),
    totalPages: z.number(),
    sortBy: z.array(z.tuple([z.string(), z.enum(['ASC', 'DESC'])])),
    filter: z.record(z.string(), z.string())
});

const FilterLinksSchema = z.object({
    current: z.string().url(),
    next: z.string().url(),
    last: z.string().url()
});

export const FilterResponseSchema = z.object({
    data: ProductsClientSchema,
    meta: FilterMetaSchema,
    links: FilterLinksSchema
});
