'use client';

import { FilterQueries, useFiltersStore } from '~&/src/entities/filter';
import { TypeQueryFilters } from '~&/src/entities/filter/filter.types';
import { ProductSmallSkeleton } from '~&/src/widgets/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Button } from '~&/src/shared/ui/button';
import { SortSelect } from '../sort-select';
import { useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

const ProductSmall = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSmall),
    {
        ssr: false,
        loading: () => <ProductSmallSkeleton />
    }
);

export const FiltersProducts = memo(
    ({ filters }: { filters: TypeQueryFilters }) => {
        const { hasActiveFilters, resetFilters } = useFiltersStore(
            state => state
        );
        const isActiveFilter = hasActiveFilters();

        const { ref, inView } = useInView();

        const {
            data: products,
            isFetchingNextPage,
            fetchNextPage,
            hasNextPage
        } = useInfiniteQuery(FilterQueries.infinityProductsQuery(filters));

        useEffect(() => {
            if (inView && hasNextPage) {
                fetchNextPage();
            }
        }, [inView, hasNextPage]);

        return (
            <div className="relative w-full h-full">
                <div className="flex justify-between items-center py-2.5 w-full">
                    <Button
                        className={`h-10 gap-2 leading-5 font-[350] ${isActiveFilter ? 'visible' : 'invisible'}`}
                        onClick={resetFilters}
                    >
                        <span>Сбросить фильтр</span>
                        <X className="size-5 stroke-1 self-center" />
                    </Button>
                    <SortSelect />
                </div>

                <div
                    className="grid w-full gap-x-5 gap-y-8
                    grid-cols-[repeat(2,minmax(150px,1fr))]
                    xs:grid-cols-[repeat(2,minmax(170px,1fr))]
                    sm:grid-cols-[repeat(3,minmax(170px,1fr))] 
                    md:grid-cols-[repeat(2,minmax(170px,1fr))]
                    lg:grid-cols-[repeat(3,minmax(170px,1fr))]
                    xl:grid-cols-[repeat(3,minmax(280px,1fr))]
                    2xl:grid-cols-[repeat(auto-fit,minmax(290px,1fr))]"
                >
                    {products?.pages.map(page =>
                        page.data.map(product => (
                            <ProductSmall
                                key={`product-small-${product.slug}`}
                                product={product}
                                withFav
                            />
                        ))
                    )}

                    {isFetchingNextPage && (
                        <div className="loading">Loading...</div>
                    )}

                    <span ref={ref} className="invisible">
                        intersection observer marker
                    </span>
                </div>

                <div
                    className={`scroll-down ${products?.pages[0].data.length > 1 || hasNextPage ? 'visible' : 'invisible'}`}
                />
            </div>
        );
    }
);

FiltersProducts.displayName = 'FiltersProducts';
