import { z } from 'zod';

export const ProductFilterSchema = z.object({
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
    image: z.union([
        z.string(),
        z.array(
            z.object({
                id: z.number(),
                value: z.array(z.string()).or(z.array(z.string()).length(0))
            })
        )
    ]),
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
    images: z.array(z.string()).or(z.array(z.string()).length(0)),
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

export const ProductSearchSchema = ProductClientSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const ProductsSchema = z.map(z.string(), ProductClientSchema);

export const ProductsApiSchema = z.array(ProductApiSchema);

export const ProductsClientSchema = z.array(ProductClientSchema);

export const ProductsSearchSchema = z.array(ProductSearchSchema);