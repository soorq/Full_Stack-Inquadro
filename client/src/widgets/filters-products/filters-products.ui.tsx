import { type FilterQuery, ProductQueries } from '~&/src/entities/product';
import { ProductSmallSkeleton } from '~&/src/widgets/product';
import { useInView } from 'react-intersection-observer';
import { Button } from '~&/src/shared/ui/button';
import dynamic from 'next/dynamic';
import React from 'react';
import {
    useInfiniteQuery
} from '@tanstack/react-query';

const ProductSmall = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSmall),
    {
        ssr: false,
        loading: () => <ProductSmallSkeleton />
    }
);

type TypeFilterProducts = {
    params: FilterQuery;
    productsInfiniteQueryOptions: typeof ProductQueries.infinityProductsQuery;
};

export const FiltersProducts = ({
    params,
    productsInfiniteQueryOptions
}: TypeFilterProducts) => {
    const queryOptions = productsInfiniteQueryOptions(params);

    const {
        isFetchingNextPage,
        data: products,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(queryOptions);

    const { ref, inView } = useInView();

    React.useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(165px,290px))] w-full gap-x-5 gap-y-8 grid-rows-3">
                {products?.pages.map(page => (
                    <React.Fragment
                        key={`page-${page.links.next}-${page.meta.sortBy[0]}`}
                    >
                        {page.data.map(product => (
                            <ProductSmall
                                key={`product-small-${product.slug}`}
                                product={{
                                    image: '/product/main.png',
                                    availability: product.availability,
                                    category: product.category,
                                    price: product.price,
                                    name: product.name,
                                    id: product.slug,
                                    total: '34',
                                    sell: ''
                                }}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div className="w-full flex justify-center items-center" ref={ref}>
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more'
                        : hasNextPage
                          ? 'Load newest'
                          : 'nothing'}
                </Button>
            </div>
        </div>
    );
};
