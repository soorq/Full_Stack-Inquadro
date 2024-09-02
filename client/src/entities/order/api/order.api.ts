import { API, handleGenericError } from '~&/src/shared/api';
import { AxiosContracts } from '~&/src/shared/lib/axios';
import type { AxiosResponse } from 'axios';
import {
    OrderSchemaCreateDto,
    OrderResponse,
    OrderResponseSchema
} from '~&/src/entities/order';

export class OrderService {
    static async orderCreate(
        data: OrderSchemaCreateDto,
        config?: {
            signal?: AbortSignal;
        }
    ): Promise<AxiosResponse<OrderResponse>> {
        try {
            const response = await API.post<OrderResponse>(
                '/requests',
                data,
                config
            );

            return AxiosContracts.responseContract(OrderResponseSchema)(
                response
            );
        } catch (error) {
            throw handleApiError(error);
        }
    }
}

function handleApiError(error: any) {
    if (error.response) {
        return handleGenericError(error);
    }
    return error;
}
