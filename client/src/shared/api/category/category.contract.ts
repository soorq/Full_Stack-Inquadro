import { z } from 'zod';

const FieldSchema = z.array(
    z.object({
        label: z.string(),
        value: z.string()
    })
);

export const CategoryResponse = z.object({
    manufacturing: FieldSchema,
    availability: FieldSchema,
    plating: FieldSchema,
    texture: FieldSchema,
    invoice: FieldSchema,
    country: FieldSchema,
    shade: FieldSchema,
    usage: FieldSchema,
    name: FieldSchema,
    size: FieldSchema
});
