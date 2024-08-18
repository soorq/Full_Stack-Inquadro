import { z } from 'zod';

export const PriceSchema = z.object({
    priceFrom: z.number().optional(),
    priceTo: z.number().optional()
});

export const FiltersSchema = z.object({
    category: z.set(z.string()),
    usage: z.set(z.string()),
    available: z.set(z.string()),
    plating: z.set(z.string()),
    invoice: z.set(z.string()),
    size: z.set(z.string()),
    texture: z.set(z.string()),
    shade: z.set(z.string()),
    wimages: z.set(z.string()),
    prices: PriceSchema
});

export const QueryFiltersSchema = z.object({
    category: z.string().optional(),
    usage: z.string().optional(),
    available: z.string().optional(),
    plating: z.string().optional(),
    invoice: z.string().optional(),
    size: z.string().optional(),
    texture: z.string().optional(),
    shade: z.string().optional(),
    wimages: z.string().optional(),
    priceFrom: z.string().optional(),
    priceTo: z.string().optional()
});
