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

    static infinityProductsQuery = (filters: TypeQueryFilters) => {
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
            }): Promise<FilterResponse> => {
                const response = await ProductService.productsFilterQuery({
                    params: {
                        page: pageParam,
                        filter,
                        sort
                    },
                    signal
                });

                this.setArticleData(response.data);

                return response.data;
            },
            initialPageParam: 0,
            getNextPageParam: lastPage => {
                const nextPageUrl = lastPage.links.next;
                if (nextPageUrl) {
                    const url = new URL(nextPageUrl);
                    const nextPage = url.searchParams.get('page');
                    return nextPage ? parseInt(nextPage, 10) : undefined;
                }
                return undefined;
            },
            getPreviousPageParam: firstPage => {
                const previousPageUrl = firstPage.links.last;
                if (previousPageUrl) {
                    const url = new URL(previousPageUrl);
                    const prevPage = url.searchParams.get('page');
                    return prevPage ? parseInt(prevPage, 10) : undefined;
                }
                return undefined;
            },
            // @ts-expect-error
            initialData: () =>
                this.getInitialData<InfiniteData<FilterResponse, number>>(
                    queryKey
                )
        });
    };

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
