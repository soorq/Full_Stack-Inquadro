import { sortOptions } from '../../lib/constants/sort-options';
import { formatSearchFilters } from '../../lib/filter-search';
import { FilterResponseSchema } from './filter.contract';
import type { FilterResponse } from './filter.types';
import { AxiosContracts } from '../../lib/axios';
import { CategoryService } from '../category';
import { AxiosResponse } from 'axios';
import { API } from '..';

export class FilterService {
    static async FilterQuery(config: {
        params: {
            filter: Record<string, string | undefined> | undefined;
            page: number;
            sort: string;
        };
        signal?: AbortSignal;
    }): Promise<AxiosResponse<FilterResponse>> {
        const filtersQueryString = formatSearchFilters(config.params.filter);
        const sortBy = sortOptions[config.params?.sort || 'available'];
        return API.get<FilterResponse>(
            `/product/filter?${filtersQueryString}&page=${config.params.page}&limit=9&sortBy=${sortBy?.by}:${sortBy?.order}`
        ).then(AxiosContracts.responseContract(FilterResponseSchema));
    }

    static async getCategory(config?: { signal: AbortSignal }) {
        return CategoryService.getAll(config);
    }
}
