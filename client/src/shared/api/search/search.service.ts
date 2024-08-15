import { AxiosContracts } from '~&/src/shared/lib/axios';
import { API, handleGenericError } from '../index';
import type { AxiosResponse } from 'axios';
import {
    type ProductsSearchApi,
    productContract
} from '~&/src/entities/product';

export class SearchService {
    static async productsQuery(
        query: string,
        config?: {
            signal?: AbortSignal;
        }
    ): Promise<AxiosResponse<ProductsSearchApi>> {
        try {
            const response = await API.get<ProductsSearchApi>(
                `/product/search?query=${query}`,
                config
            );

            return AxiosContracts.responseContract(
                productContract.ProductsSearchSchema
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