import { z } from 'zod';

export const ProductFilterSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),

    limit: z.number().min(1).default(20),
    offset: z.number().min(0).default(0),

    /** Дополнительные фильтры
     * Это объект с произвольными строковыми значениями фильтров
     * Можно оставить это поле динамическим и не проверять конкретные ключи
     * чтобы дать возможность фильтрации по любым полям
     * Или задать конкретные ключи, если они известны
     * @example
     * tag: z.string().optional(),
     * category: z.string().optional(),
     * и т.д.
     * Для гибкости, оставляем это поле как произвольные строки
     * Можно также использовать `z.record(z.string())` для других значений
     */
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
    createdAt: dynamicFieldSchema,
    updatedAt: dynamicFieldSchema,
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
    createdAt: z.string(),
    updatedAt: z.string(),
    shade: z.string(),
    article: z.string(),
    slug: z.string()
});

export const ProductSearchSchema = ProductClientSchema.extend({
    id: z.string()
});

export const ProductsApiSchema = z.array(ProductApiSchema);
export const ProductsSearchSchema = z.array(ProductSearchSchema);

export const ProductsFeedParamsDtoSchema = z.object({
    offset: z.number().min(0),
    limit: z.number().min(1)
});
