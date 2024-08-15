import { queryClient } from '~&/src/shared/lib/query-client';
import { ProductService } from '~&/src/shared/api/product';
import { ProductApi, ProductClient, ProductsApi } from './product.types';
import { queryOptions } from '@tanstack/react-query';

export class ProductsQueries {
    static readonly keys = {
        root: ['product'] as const,
        rootBySlug: ['product', 'by-slug'] as const,
        rootByMany: ['product', 'by-many'] as const,
        rootInfinity: ['product', 'infinite-products'] as const,
        generalInfinity: [
            'product',
            'infinite-products',
            'general-products',
            'by-filter'
        ] as const
    };

    static productQuery(slug: string) {
        return queryOptions({
            queryKey: [...this.keys.rootBySlug, slug],
            queryFn: async ({ signal }) => {
                return ProductService.productQuery(slug, { signal });
            },
            /**
             * FIXME: https://github.com/TanStack/query/issues/7341
             */
            // @ts-expect-error
            initialData: () =>
                this.getInitialData<ProductApi>(['product', slug])
        });
    }

    static productsQuery() {
        return queryOptions({
            queryKey: [...this.keys.rootBySlug],
            queryFn: async () => {}
        });
    }

    // static productsInfiniteQuery(filter?: FilterQuery) {
    //     const { limit = 10, offset = 0, filters } = filter || {};
    //
    //     const queryKey = [
    //         ...this.keys.rootInfinity,
    //         'genearal-articles',
    //         'by-filter',
    //         { ...filters.category },
    //         { ...filters.category },
    //         { ...filters.category }
    //     ].filter(Boolean) as string[];
    //
    //     return infiniteQueryOptions({
    //         queryKey,
    //         queryFn: async ({ pageParam, signal }) => {
    //             const response = await ArticleService.articlesQuery({
    //                 params: {
    //                     limit,
    //                     offset: pageParam * limit,
    //                     ...(filters.category && { filters.category }),
    //                     ...(filters.availability && { filters.availability }),
    //                     ...(filters.usage && { filters.usage })
    //                 },
    //                 signal
    //             });
    //
    //             const articles = transformArticlesDtoToArticles(response.data);
    //
    //             this.setArticleData(articles);
    //
    //             return articles;
    //         },
    //         initialPageParam: this.getInitialPageParam({ limit, offset }),
    //         getNextPageParam: this.getNextPageParam(limit),
    //         getPreviousPageParam: this.getPreviousPageParam,
    //          /**
    //              * FIXME: https://github.com/TanStack/query/issues/7341
    //              */
    //             // @ts-expect-error
    //         initialData: () =>
    //             this.getInitialData<InfiniteData<Articles, number>>(queryKey),
    //         initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey)
    //     });
    // }

    // static productsFeedInfinityQuery(filter?: FilterQuery) {
    //     const { limit = 10, offset = 0 } = filter || {}
    //
    //     const queryKey = [...this.keys.rootInfinity, 'feed-articles']
    //
    //     return infiniteQueryOptions({
    //         queryKey,
    //         queryFn: async ({ pageParam, signal }) => {
    //             const response = await ArticleService.articlesFeedQuery({
    //                 params: { limit, offset: pageParam * limit },
    //                 signal,
    //             })
    //
    //             const articles = transformArticlesDtoToArticles(response.data)
    //
    //             this.setArticleData(articles)
    //
    //             return articles
    //         },
    //         initialPageParam: this.getInitialPageParam({ limit, offset }),
    //         getNextPageParam: this.getNextPageParam(limit),
    //         getPreviousPageParam: this.getPreviousPageParam,
    //         /**
    //          * FIXME: https://github.com/TanStack/query/issues/7341
    //          */
    //         // @ts-expect-error
    //         initialData: () =>
    //             this.getInitialData<InfiniteData<Product, number>>(queryKey),
    //         initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    //     })
    // }

    private static getInitialPageParam(filter: {
        offset: number;
        limit: number;
    }) {
        return filter.offset / filter.limit;
    }

    private static getInitialData<T>(queryKey: string[]) {
        return queryClient.getQueryData<T>(queryKey);
    }

    private static getQueryDataUpdateAt<T>(slug: string[]) {
        return queryClient.getQueryState<T>(slug)?.dataUpdatedAt;
    }

    private static getNextPageParam(limit: number) {
        return (
            lastPage: ProductClient,
            _allPages: Array<ProductsApi>,
            lastPageParam: number
        ) => {
            if (+lastPage.size < limit) return;
            return lastPageParam + 1;
        };
    }

    private static getPreviousPageParam(
        _firstPage: ProductApi,
        _allPages: Array<ProductApi>,
        firstPageParam: number
    ) {
        if (firstPageParam <= 1) return;
        return firstPageParam - 1;
    }

    private static setArticleData(products: ProductsApi) {
        products.forEach(product => {
            queryClient.setQueryData(
                [...this.keys.root, product.slug],
                product
            );
        });
    }
}
