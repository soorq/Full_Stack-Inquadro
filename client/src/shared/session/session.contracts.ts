import { z } from 'zod';

export const SessionSchema = z.object({
    address: z.union([z.string(), z.null()]),
    phone: z.union([z.string(), z.null()]),
    city: z.union([z.string(), z.null()]),
    name: z.union([z.string(), z.null()]),
    isVerifed: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    email: z.string(),
    id: z.number()
});
