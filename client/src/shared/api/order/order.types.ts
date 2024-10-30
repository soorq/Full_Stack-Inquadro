import {
    OrderCreateSchemaDto,
    OrderResponseSchema,
    OrderFormSchema
} from './order.contract';
import { z } from 'zod';

export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrderCreateDto = z.infer<typeof OrderCreateSchemaDto>;
export type OrderForm = z.infer<typeof OrderFormSchema>;
