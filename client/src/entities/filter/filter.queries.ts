import { getQueryClient } from '~&/src/shared/lib/query-client';

import {
    type InfiniteData,
    infiniteQueryOptions,
    keepPreviousData,
    QueryClient,
    queryOptions
} from '@tanstack/react-query';
import { FilterService, filterT } from '~&/src/shared/api/filter';

export class FilterQueries {
    static readonly queryClient: QueryClient = getQueryClient();
    static readonly keys = {
        infinitySlug: ['product', 'infinity'] as const,
        categories: ['filter', 'categories'] as const
    };

    static infinityProductsQuery = (filters: filterT.TypeQueryFilters) => {
        const { sort, ...filter } = filters;

        const queryKey = [
            ...this.keys.infinitySlug,
            'by-filter',
            filter,
            sort
        ].filter(Boolean) as string[];

        return infiniteQueryOptions({
            // eslint-disable-next-line @tanstack/query/exhaustive-deps
            queryKey,
            queryFn: async ({
                pageParam = 1,
                signal
            }): Promise<filterT.FilterResponse> => {
                const response = await FilterService.FilterQuery({
                    params: {
                        page: pageParam,
                        filter,
                        sort
                    },
                    signal
                });

                this.setProductsData(response.data);

                return response.data;
            },
            initialPageParam: 0,
            getNextPageParam: lastPage => {
                const nextPageUrl = lastPage.links.next;
                if (nextPageUrl) {
                    const url = new URL(nextPageUrl);
                    const nextPage = url.searchParams.get('page');
                    return nextPage ? parseInt(nextPage) : undefined;
                }
                return undefined;
            },
            networkMode: 'offlineFirst',
            getPreviousPageParam: firstPage => {
                const previousPageUrl = firstPage.links.last;
                if (previousPageUrl) {
                    const url = new URL(previousPageUrl);
                    const prevPage = url.searchParams.get('page');
                    return prevPage ? parseInt(prevPage) : undefined;
                }
                return undefined;
            },
            placeholderData: keepPreviousData,
            //@ts-expect-error
            initialData: () =>
                this.getInitialData<
                    InfiniteData<filterT.FilterResponse, number>
                >(queryKey)
        });
    };

    static categoryQuery() {
        return queryOptions({
            queryKey: [this.keys.categories],
            queryFn: ({ signal }) =>
                FilterService.getCategory({
                    signal
                }),
            networkMode: 'offlineFirst',
            staleTime: 60 * 60 * 15 * 1000,
            placeholderData: keepPreviousData
        });
    }

    private static getInitialData<T>(queryKey: string[]) {
        return this.queryClient.getQueryData<T>(queryKey);
    }

    private static setProductsData(products: filterT.FilterResponse) {
        products.data.forEach(product => {
            this.queryClient.setQueryData(
                [...this.keys.infinitySlug, product.slug],
                product
            );
        });
    }
}
