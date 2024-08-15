import { z } from 'zod';

export const OrderSchemaCreate = z.object({
    name: z.string().nonempty({ message: 'Введите имя' }),
    phone: z.string().nonempty(),
    email: z
        .string()
        .email({ message: 'Введите корректный адрес электронной почты' })
        .nonempty({ message: 'Адрес электронной почты обязателен' }),
    city: z.string().nonempty(),
    address: z.string().nonempty({ message: 'Укажите адрес' }),
    entrance: z.string(),
    shipping_method: z.enum(['yourself', 'courier']),
    payment_method: z.enum(['cash', 'payment'])
});

export const OrderSchema = z.object({
    name: z.string().nonempty({ message: 'Введите имя' }),
    phone: z.string().nonempty(),
    email: z
        .string()
        .email({ message: 'Введите корректный адрес электронной почты' })
        .nonempty({ message: 'Адрес электронной почты обязателен' }),
    city: z.string().nonempty(),
    address: z.string().nonempty({ message: 'Укажите адрес' }),
    entrance: z.string().optional().default(''),
    shipping_method: z.enum(['yourself', 'courier']),
    payment_method: z.enum(['cash', 'payment']),
    isPolicy: z.boolean().default(false)
});
