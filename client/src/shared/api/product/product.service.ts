import { sortOptions } from '~&/src/shared/lib/constants/sort-options';
import { formatSearchFilters } from '~&/src/shared/lib/filter-search';
import { filterTypes, filtersContract } from '~&/src/entities/filter';
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

    static async productsFilterQuery(config: {
        params: {
            filter: Record<string, string | undefined> | undefined;
            page: number;
            sort: string;
        };
        signal?: AbortSignal;
    }): Promise<AxiosResponse<filterTypes.FilterResponse>> {
        try {
            const filtersQueryString = formatSearchFilters(
                config.params.filter
            );
            const sortBy = sortOptions[config.params?.sort || 'available'];
            return API.get<filterTypes.FilterResponse>(
                `/product/filter?${filtersQueryString}&page=${config.params.page}&limit=12&sortBy=${sortBy?.by}:${sortBy?.order}`
            ).then(
                AxiosContracts.responseContract(
                    filtersContract.FilterResponseSchema
                )
            );
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
            console.log(error);
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
