import { z } from 'zod';
import {
    OrderResponseSchema,
    OrderSchema,
    OrderSchemaCreate
} from './order.contracts';

export type OrderSchemaDto = z.infer<typeof OrderSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrderSchemaCreateDto = z.infer<typeof OrderSchemaCreate>;
