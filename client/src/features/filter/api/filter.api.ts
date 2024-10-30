import { sortOptions } from '~&/src/shared/lib/constants/sort-options';
import { formatSearchFilters } from '~&/src/shared/lib/filter-search';
import { API, handleGenericError } from '~&/src/shared/api';
import { AxiosContracts } from '~&/src/shared/lib/axios';
import type { AxiosResponse } from 'axios';
import {
    FilterCategories,
    FilterResponse,
    FilterResponseCategories,
    FilterResponseSchema
} from '../model';

export class FilterService {
    static async FilterQuery(config: {
        params: {
            filter: Record<string, string | undefined> | undefined;
            page: number;
            sort: string;
        };
        signal?: AbortSignal;
    }): Promise<AxiosResponse<FilterResponse>> {
        try {
            const filtersQueryString = formatSearchFilters(
                config.params.filter
            );
            const sortBy = sortOptions[config.params?.sort || 'available'];
            return API.get<FilterResponse>(
                `/product/filter?${filtersQueryString}&page=${config.params.page}&limit=9&sortBy=${sortBy?.by}:${sortBy?.order}`
            ).then(AxiosContracts.responseContract(FilterResponseSchema));
        } catch (error) {
            throw handleApiError(error);
        }
    }

    static async FilterCategoriesQuery(config?: {
        signal?: AbortSignal;
    }): Promise<AxiosResponse<FilterCategories>> {
        return API.get<FilterCategories>(`/product/categories`, config).then(
            AxiosContracts.responseContract(FilterResponseCategories)
        );
    }
}

function handleApiError(error: any) {
    if (error.response) {
        return handleGenericError(error);
    }
    return error;
}
