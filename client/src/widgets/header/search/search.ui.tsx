'use client';

import { ProductSearchSkeleton } from '~&/src/features/product/search';
import { Divide, MagnifyingGlass } from '@phosphor-icons/react';
import { useClickAway, useDebounce } from 'react-use';
import { SearchQueries } from './search.queries';
import { useQuery } from '@tanstack/react-query';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import dynamic from 'next/dynamic';
import React from 'react';

const ProductSearch = dynamic(
    () => import('~&/src/features/product/search').then(cn => cn.ProductSearch),
    {
        ssr: false,
        loading: () => <ProductSearchSkeleton />
    }
);

export const SearchUi = ({ className }: { className?: string }) => {
    const ref = React.useRef(null);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);

    const {
        data: products,
        refetch,
        isLoading
    } = useQuery({
        ...SearchQueries.searchByQuery(searchQuery),
        enabled: !!searchQuery.trim()
    });

    useClickAway(ref, () => setFocused(false));

    useDebounce(
        () => {
            if (searchQuery.trim()) {
                refetch();
            }
        },
        1000,
        [searchQuery]
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
    };

    return (
        <>
            {focused && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10" />
            )}
            <div
                className={cn(
                    'w-auto md:w-full z-20 h-[50px] fixed md:relative transition-all duration-300',
                    focused
                        ? 'inset-2.5 md:inset-0 md:px-4'
                        : 'relative',
                    className
                )}
                ref={ref}
            >
                <div
                    className={cn(
                        'flex flex-row-reverse md:flex-row items-center z-20 relative gap-3.5 shadow-sm transition-colors bg-secondary rounded-lg px-3',
                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                    )}
                    aria-label="input"
                >
                    <MagnifyingGlass weight="regular" className="h-5 w-5" />

                    <Input
                        className="bg-transparent focus-visible:ring-0 placeholder:text-lg px-0 leading-4"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="плитка оникс"
                        onFocus={() => setFocused(true)}
                    />
                </div>

                <div className="relative mt-5">
                    {!isLoading && products?.data && (
                        <div
                            className={cn(
                                'absolute w-full bg-white rounded-[10px] py-2 shadow-md transition-opacity duration-200',
                                'top-[125%] max-h-[550px] overflow-y-auto z-30',
                                focused
                                    ? 'opacity-100 visible'
                                    : 'opacity-0 invisible'
                            )}
                        >
                            <div className="flex flex-col w-full h-full">
                                {products.data.length > 1 ? (
                                    products.data.map(product => (
                                        <ProductSearch
                                            key={`product-search-${product.article}`}
                                            onClick={onClickItem}
                                            product={product}
                                        />
                                    ))
                                ) : (
                                    <p className="text-center py-5">
                                        Ничего не найдено
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
