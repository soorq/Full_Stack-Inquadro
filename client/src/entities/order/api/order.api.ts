import { OrderSchemaCreateDto, OrderSchemaCreate } from '~&/src/entities/order';
import { API, handleGenericError } from '~&/src/shared/api';
import { AxiosContracts } from '~&/src/shared/lib/axios';
import type { AxiosResponse } from 'axios';

export class OrderService {
    static async orderCreate(
        data: OrderSchemaCreateDto,
        config?: {
            signal?: AbortSignal;
        }
    ): Promise<AxiosResponse<OrderSchemaCreateDto>> {
        try {
            const response = await API.post<OrderSchemaCreateDto>(
                '/requests',
                data,
                config
            );

            return AxiosContracts.responseContract(OrderSchemaCreate)(response);
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
