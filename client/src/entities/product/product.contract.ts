import { z } from 'zod';

export const ProductFilterSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),

    // Параметры для пагинации
    limit: z.number().min(1).default(20), // Значение по умолчанию 20
    offset: z.number().min(0).default(0), // Значение по умолчанию 0

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
            id: z.string(),
            value: z.string()
        })
    )
]);

// Определение схемы для объединенного продукта
export const ProductSchema = z.object({
    name: z.string(),
    category: dynamicFieldSchema, // Поле может быть строкой или массивом объектов
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

export const ProductsSchema = z.map(z.string(), ProductSchema);
