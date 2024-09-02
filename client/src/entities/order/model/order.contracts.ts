import { productContract } from '~&/src/entities/product';
import { z } from 'zod';

const ProductWithQuantitySchema = productContract.ProductClientSchema.extend({
    quantity: z.number().int().positive(),
    totalPrice: z.number().nonnegative()
});

export const OrderSchemaCreate = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    city: z.string(),
    address: z.string(),
    entrance: z.string(),
    shipping_method: z.enum(['самовывоз', 'курьер']),
    payment_method: z.enum(['наличка', 'карта']),
    products: z.array(ProductWithQuantitySchema),
    quantity: z.number(),
    price: z.number(),
    area: z.number()
});

export const OrderSchema = z.object({
    name: z.string({ required_error: 'необходимо заполнить' }),
    phone: z.string({ required_error: 'необходимо заполнить' }),
    email: z
        .string({ required_error: 'необходимо заполнить' })
        .email({ message: 'необходимо заполнить' }),
    city: z.string({ required_error: 'необходимо заполнить' }),
    address: z.string({ required_error: 'необходимо заполнить' }),
    entrance: z.string().optional().default(''),
    shipping_method: z.enum(['самовывоз', 'курьер']),
    payment_method: z.enum(['наличка', 'карта']),
    isPolicy: z.boolean({ required_error: 'Поле ознакомлен - обязательно' })
});

export const OrderResponseSchema = z.object({
    order_id: z.string(),
    products: z.array(z.string()),
    price: z.number().optional(),
    area: z.number().optional(),
    quantity: z.number().optional(),
    id: z.number().optional(),
    createdAt: z.string().optional()
});
