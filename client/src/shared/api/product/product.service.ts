import { ProductDto, ProductsDto, ProductsParamsQueryDto } from '../api.types';
import { ProductDtoSchema, ProductsDtoSchema } from '../api.contract';
import { AxiosContracts } from '~&/src/shared/lib/axios';
import { API, handleGenericError } from '../index';
import type { AxiosResponse } from 'axios';

export class ProductService {
    static async productsQuery(config?: {
        signal?: AbortSignal;
    }): Promise<AxiosResponse<ProductsDto>> {
        try {
            const response = await API.get('/product/all', config);
            return AxiosContracts.responseContract(ProductsDtoSchema)(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    static async productsFeedQuery(config: {
        params: ProductsParamsQueryDto;
        signal?: AbortSignal;
    }): Promise<AxiosResponse<ProductsDto>> {
        try {
            const response = await API.get('/product/feed', config);
            return AxiosContracts.responseContract(ProductsDtoSchema)(response);
        } catch (error) {
            throw handleApiError(error);
        }
    }

    static async productQuery(
        slug: string,
        config: { signal?: AbortSignal }
    ): Promise<AxiosResponse<ProductDto>> {
        try {
            const response = await API.get(`/product/get/${slug}`, config);
            return AxiosContracts.responseContract(ProductDtoSchema)(response);
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
