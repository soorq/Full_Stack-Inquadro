'use client';

import { ProductSmallSkeleton } from '~&/src/features/product/small';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SortSelect } from '~&/src/widgets/sort-select';
import { useInView } from 'react-intersection-observer';
import { Button } from '~&/src/shared/ui/button';
import { X } from '@phosphor-icons/react';
import { useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import {
    TypeQueryFilters,
    useFiltersStore,
    FilterQueries
} from '~&/src/features/filter';

const ProductSmall = dynamic(
    () => import('~&/src/features/product/small').then(cn => cn.ProductSmall),
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
        }, [inView, hasNextPage, fetchNextPage]);

        return (
            <section className="relative w-full h-full">
                <div className="hidden md:flex justify-between items-center py-2.5 w-full">
                    <Button
                        className={`h-10 gap-2 leading-5 hidden md:flex font-[350] ${isActiveFilter ? 'visible' : 'invisible'}`}
                        onClick={resetFilters}
                    >
                        <span>сбросить фильтр</span>
                        <X
                            weight="light"
                            className="size-5 stroke-1 self-center"
                        />
                    </Button>
                    <SortSelect />
                </div>

                <div
                    className="grid w-full max-h-[118dvh] h-full overflow-y-auto gap-x-2.5 gap-y-4 sm:gap-x-5 sm:gap-y-8 grid-cols-2
                    sm:grid-cols-[repeat(3,minmax(170px,1fr))] 
                    md:grid-cols-[repeat(2,minmax(170px,1fr))]
                    lg:grid-cols-[repeat(3,minmax(170px,1fr))]
                    xl:grid-cols-[repeat(3,minmax(280px,1fr))]
                    2xl:grid-cols-[repeat(auto-fit,minmax(290px,1fr))]"
                >
                    {products?.pages &&
                        products.pages.every(
                            page => page.data.length === 0
                        ) && (
                            <div className="sm:row-start-7 sm:col-start-2 shadow-xl shadow-black/30 text-center bg-primary text-white py-2.5 rounded-[10px]">
                                Ничего не найдено
                            </div>
                        )}

                    {products?.pages.map(page =>
                        page.data.map(product => (
                            <ProductSmall
                                key={`product-catalog-small-${product.slug}`}
                                product={product}
                                withFav
                            />
                        ))
                    )}

                    {isFetchingNextPage && (
                        <div className="loading">Loading...</div>
                    )}

                    <span ref={ref} className="invisible sm:col-span-3 h-10" />
                </div>
            </section>
        );
    }
);

FiltersProducts.displayName = 'FiltersProducts';
