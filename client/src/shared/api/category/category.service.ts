import { API } from '..';
import { AxiosContracts } from '../../lib/axios';
import { CategoryResponse } from './category.contract';

export class CategoryService {
    static getAll(config?: { signal: AbortSignal }) {
        return API.get(`/product/categories`, config).then(
            AxiosContracts.responseContract(CategoryResponse)
        );
    }
}
