import { AxiosContracts } from '~&/src/shared/lib/axios';
import { API, handleGenericError } from '../index';
import type { AxiosResponse } from 'axios';
import {
    ProductApi,
    ProductsApi,
    productContract
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

    static async productsFeedQuery(config: {
        signal?: AbortSignal;
    }): Promise<AxiosResponse<ProductsApi>> {
        try {
            const response = await API.get<ProductsApi>(
                '/product/feed',
                config
            );
            return AxiosContracts.responseContract(
                productContract.ProductsApiSchema
            )(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    static async productQuery(
        slug: string,
        config?: { signal?: AbortSignal }
    ): Promise<AxiosResponse<ProductApi>> {
        try {
            const response = await API.get<ProductApi>(
                `/product/get/${slug}`,
                config
            );
            return AxiosContracts.responseContract(
                productContract.ProductApiSchema
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
