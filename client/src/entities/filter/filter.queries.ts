import type { FilterResponse, TypeQueryFilters } from './filter.types';
import { getQueryClient } from '~&/src/shared/lib/query-client';
import { ProductService } from '~&/src/shared/api/product';
import {
    type InfiniteData,
    infiniteQueryOptions,
    QueryClient
} from '@tanstack/react-query';

export class FilterQueries {
    static readonly queryClient: QueryClient = getQueryClient();
    static readonly keys = {
        infinitySlug: ['product', 'infinity'] as const
    };

    static readonly options = {
        limit: 10,
        offset: 0
    };

    static infinityProductsQuery = (filters: TypeQueryFilters) => {
        const { offset, limit } = this.options;
        const queryKey = [
            ...this.keys.infinitySlug,
            'by-filter',
            filters
        ].filter(Boolean) as string[];

        return infiniteQueryOptions({
            // eslint-disable-next-line @tanstack/query/exhaustive-deps
            queryKey,
            queryFn: async ({
                pageParam = 0,
                signal
            }): Promise<FilterResponse> => {
                const response = await ProductService.productsFilterQuery({
                    params: {
                        offset: pageParam,
                        filters,
                        limit
                    },
                    signal
                });

                this.setArticleData(response.data);

                return response.data;
            },
            initialPageParam: this.getInitialPageParam({ limit, offset }),
            getNextPageParam: lastPage => {
                return lastPage.meta.currentPage < lastPage.meta.totalPages
                    ? lastPage.meta.currentPage + 1
                    : undefined;
            },
            getPreviousPageParam: firstPage => {
                return firstPage.meta.currentPage > 1
                    ? firstPage.meta.currentPage - 1
                    : undefined;
            },
            // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
            initialData: () =>
                this.getInitialData<InfiniteData<FilterResponse, number>>(
                    queryKey
                )
        });
    };

    private static getInitialPageParam(filter: {
        offset: number;
        limit: number;
    }) {
        return filter.offset / filter.limit;
    }

    private static getInitialData<T>(queryKey: string[]) {
        return this.queryClient.getQueryData<T>(queryKey);
    }

    private static setArticleData(products: FilterResponse) {
        products.data.forEach(product => {
            this.queryClient.setQueryData(
                [...this.keys.infinitySlug, product.slug],
                product
            );
        });
    }
}
