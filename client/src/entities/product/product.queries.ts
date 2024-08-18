import type { FilterQuery, FilterResponse } from './product.types';
import {
    InfiniteData,
    infiniteQueryOptions,
    QueryClient
} from '@tanstack/react-query';
import { ProductService } from '~&/src/shared/api/product';
import { getQueryClient } from '~&/src/shared/lib/query-client';

export class ProductQueries {
    static readonly queryClient: QueryClient = getQueryClient();
    static readonly keys = {
        root: ['product'],
        infinitySlug: ['product', 'infinity'] as const
    };
    static readonly options = {
        limit: 10,
        offset: 0
    };

    static infinityProductsQuery = ({ filters = {} }: FilterQuery) => {
        const { offset, limit } = this.options;
console.log(filters, 'filters query')
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
                        offset: pageParam * limit,
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
                ),
            initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey)
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

    private static getQueryDataUpdateAt<T>(slug: string[]) {
        return this.queryClient.getQueryState<T>(slug)?.dataUpdatedAt;
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
