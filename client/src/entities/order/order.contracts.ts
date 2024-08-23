import { z } from 'zod';

export const OrderSchemaCreate = z.object({
    name: z.string({ required_error: 'Необходимо заполнить' }),
    phone: z.string({ required_error: 'Необходимо заполнить' }),
    email: z
        .string({ required_error: 'Необходимо заполнить' })
        .email({ message: 'Необходимо заполнить' }),
    city: z.string(),
    address: z.string(),
    entrance: z.string(),
    shipping_method: z.enum(['yourself', 'courier']),
    payment_method: z.enum(['cash', 'payment'])
});

export const OrderSchema = z.object({
    name: z.string({ required_error: 'Необходимо заполнить' }),
    phone: z.string({ required_error: 'Необходимо заполнить' }),
    email: z
        .string({ required_error: 'Необходимо заполнить' })
        .email({ message: 'Необходимо заполнить' }),
    city: z.string({ required_error: 'Необходимо заполнить' }),
    address: z.string({ required_error: 'Необходимо заполнить' }),
    entrance: z.string().optional().default(''),
    shipping_method: z.enum(['yourself', 'courier']),
    payment_method: z.enum(['cash', 'payment']),
    isPolicy: z.boolean().default(false)
});
