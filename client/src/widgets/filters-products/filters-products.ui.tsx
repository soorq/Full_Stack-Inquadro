'use client';

import { FilterQueries, useFiltersStore } from '~&/src/entities/filter';
import { TypeQueryFilters } from '~&/src/entities/filter/filter.types';
import { ProductSmallSkeleton } from '~&/src/widgets/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Button } from '~&/src/shared/ui/button';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '~&/src/shared/ui/select';

const ProductSmall = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSmall),
    {
        ssr: false,
        loading: () => <ProductSmallSkeleton />
    }
);

export const FiltersProducts = ({ filters }: { filters: TypeQueryFilters }) => {
    const { hasActiveFilters, resetFilters } = useFiltersStore(state => state);
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
        <div className="w-full relative h-full">
            <div className="w-full flex justify-between items-center py-2.5">
                <Button
                    className={`gap-2 h-10 leading-5 font-[350] ${isActiveFilter ? 'visible' : 'invisible'}`}
                    onClick={() => resetFilters()}
                >
                    <span>сбросить фильтр</span>
                    <X className="size-5 stroke-1 self-center" />
                </Button>

                <Select>
                    <SelectTrigger className="self-end w-[182px] gap-2.5">
                        <SelectValue placeholder="сортировать по" />
                    </SelectTrigger>
                    <SelectContent className="bg-primary text-white w-[--radix-popover-trigger-width] font-[350] border-none">
                        <SelectGroup>
                            <SelectItem value="available">
                                по доступным
                            </SelectItem>
                            <SelectItem value="premium">
                                по премиальным
                            </SelectItem>
                            <SelectItem value="new">по новым</SelectItem>
                            <SelectItem value="popularity">
                                по популярным
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid md:grid-cols-[repeat(auto-fit,minmax(170px,290px))] scroll-none overflow-y-auto max-h-[75dvh] xl:grid-cols-[repeat(auto-fit,minmax(290px, 1fr)] w-full gap-x-5 gap-y-8">
                {products?.pages.map(page =>
                    page.data.map(product => (
                        <ProductSmall
                            key={`product-small-${product.slug}`}
                            product={product}
                        />
                    ))
                )}
                {isFetchingNextPage ? (
                    <div className="loading">Loading...</div>
                ) : null}

                <span style={{ visibility: 'hidden' }} ref={ref}>
                    intersection observer marker
                </span>
            </div>
            <div
                className={`scroll-down ${products?.pages[0].data.length > 1 ? 'visible' : 'invisible'}`}
            />
        </div>
    );
};
