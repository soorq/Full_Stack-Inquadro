import { OrderSchema, OrderSchemaCreate } from './order.contracts';
import { z } from 'zod';

export type OrderSchemaDto = z.infer<typeof OrderSchema>;
export type OrderSchemaCreateDto = z.infer<typeof OrderSchemaCreate>;
