import { orderContracts, type orderTypes } from '~&/src/entities/order';
import { AxiosContracts } from '~&/src/shared/lib/axios';
import { API, handleGenericError } from '../index';
import type { AxiosResponse } from 'axios';

export class OrderService {
    static async orderCreate(
        data: orderTypes.OrderSchemaCreateDto,
        config?: {
            signal?: AbortSignal;
        }
    ): Promise<AxiosResponse<orderTypes.OrderSchemaCreateDto>> {
        try {
            const response = await API.post<orderTypes.OrderSchemaCreateDto>(
                '/requests',
                data,
                config
            );

            return AxiosContracts.responseContract(
                orderContracts.OrderSchemaCreate
            )(response);
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
