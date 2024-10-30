import { AxiosContracts } from '~&/src/shared/lib/axios';
import type { AxiosResponse } from 'axios';
import { API } from '../index';
import {
    productContract,
    type ProductsApi,
    type ProductApi
} from '~&/src/entities/product';

export class ProductService {
    static async getAll(config?: {
        signal?: AbortSignal;
    }): Promise<AxiosResponse<ProductsApi>> {
        return API.get<ProductsApi>('/product/all', config);
    }

    static async get(
        slug: string,
        config?: { signal?: AbortSignal }
    ): Promise<AxiosResponse<ProductApi>> {
        return API.get<ProductApi>(`/product/get/${slug}`, config).then(
            AxiosContracts.responseContract(productContract.ProductApiSchema)
        );
    }
}
