import { EProduct } from './product.entity';
import { EAdmin } from './admin.entity';
import { EOrder } from './order.entity';
import { EUser } from './user.entity';

export * from './product.entity';
export * from './order.entity';
export * from './admin.entity';
export * from './user.entity';

export const ENTITIES = [EProduct, EAdmin, EUser, EOrder];
