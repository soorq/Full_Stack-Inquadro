import { AxiosContracts } from '~&/src/shared/lib/axios';
import { API, handleGenericError } from '../index';
import type { AxiosResponse } from 'axios';
import {
    productContract,
    type FilterResponse,
    type FilterQuery,
    type ProductsApi,
    type ProductApi
} from '~&/src/entities/product';
import { formatSearchFilters } from '~&/src/shared/lib/filter-search';


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

    static async productsFilterQuery(config: {
        params: FilterQuery & { limit: number; offset: number },
        signal?: AbortSignal;
    }): Promise<AxiosResponse<FilterResponse>> {
        try {
            const validatedParams = productContract.ProductFilterQuerySchema.parse(config.params);
            const filtersQueryString = formatSearchFilters(validatedParams);

            console.log(filtersQueryString);

            console.log(`/product/filter?${filtersQueryString}`)

            return API.get<FilterResponse>(`/product/filter?${filtersQueryString}`, { signal: config.signal });
            // .then(AxiosContracts.responseContract(productContract.FilterResponseSchema));
        } catch (error) {
            throw handleApiError(error);
        }
    }

    static async productQuery(
        slug: string,
        config?: { signal?: AbortSignal }
    ): Promise<AxiosResponse<ProductApi>> {
        try {
            return API.get<ProductApi>(`/product/get/${slug}`, config)
                .then(AxiosContracts.responseContract(productContract.ProductApiSchema));
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
