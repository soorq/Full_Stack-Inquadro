import { z } from 'zod';

const DynamicFieldSchema = z.union([
    z.string(),
    z.array(
        z.object({
            id: z.union([z.string(), z.number()]),
            value: z.string()
        })
    )
]);

export const ProductDtoSchema = z.object({
    name: z.string(),
    category: DynamicFieldSchema,
    availability: DynamicFieldSchema,
    usage: DynamicFieldSchema,
    image: DynamicFieldSchema,
    plating: DynamicFieldSchema,
    texture: DynamicFieldSchema,
    invoice: DynamicFieldSchema,
    size: DynamicFieldSchema,
    country: DynamicFieldSchema,
    price: DynamicFieldSchema,
    manufacturing: DynamicFieldSchema,
    kit: DynamicFieldSchema,
    createdAt: DynamicFieldSchema,
    updatedAt: DynamicFieldSchema,
    shade: DynamicFieldSchema,
    article: DynamicFieldSchema,
    slug: DynamicFieldSchema
});

export const ProductSearchDtoSchema = z.object({
    id: z.string(),
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
    createdAt: z.string(),
    updatedAt: z.string(),
    shade: z.string(),
    article: z.string(),
    slug: z.string()
});

export const ProductsSearchDtoSchema = z.array(ProductSearchDtoSchema);

export const ProductsDtoSchema = z.array(ProductDtoSchema);

export const ProductsFeedParamsDtoSchema = z.object({
    offset: z.number().min(0),
    limit: z.number().min(1)
});
