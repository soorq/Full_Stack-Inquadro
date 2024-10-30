import { OrderCreateSchemaDto, OrderResponseSchema } from './order.contract';
import { AxiosContracts } from '~&/src/shared/lib/axios';
import type { OrderCreateDto } from './order.types';
import { API } from '~&/src/shared/api';

export class OrderService {
    static async create(
        data: OrderCreateDto,
        config?: {
            signal?: AbortSignal;
        }
    ) {
        const orderDto = AxiosContracts.requestContract(
            OrderCreateSchemaDto,
            data
        );

        return API.post('/requests', orderDto, config).then(
            AxiosContracts.responseContract(OrderResponseSchema)
        );
    }
}
