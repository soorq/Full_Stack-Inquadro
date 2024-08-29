import { AxiosContracts } from '~&/src/shared/lib/axios';
import { API, handleGenericError } from '../index';
import type { AxiosResponse } from 'axios';
import {
    productContract,
    type ProductsApi,
    type ProductApi
} from '~&/src/entities/product';

export class ProductService {
    static async productsQuery(config?: {
        signal?: AbortSignal;
    }): Promise<AxiosResponse<ProductsApi>> {
        try {
            return API.get<ProductsApi>('/product/all', config);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    static async productQuery(
        slug: string,
        config?: { signal?: AbortSignal }
    ): Promise<AxiosResponse<ProductApi>> {
        try {
            return API.get<ProductApi>(`/product/get/${slug}`, config).then(
                AxiosContracts.responseContract(
                    productContract.ProductApiSchema
                )
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
