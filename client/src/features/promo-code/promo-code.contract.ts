import { z } from 'zod';

export const schema = z.object({
    promo: z.string().nonempty()
});

export type InferedSchema = z.infer<typeof schema>;
