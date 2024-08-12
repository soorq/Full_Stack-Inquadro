import { API, handleGenericError } from '../index';
import { ProductsSearchDto } from '../api.types';
import type { AxiosResponse } from 'axios';

export class SearchService {
    static async productsQuery(
        query: string,
        config?: {
            signal?: AbortSignal;
        }
    ): Promise<AxiosResponse<ProductsSearchDto>> {
        try {
            return API.get(`/product/search?query=${query}`, config);
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
