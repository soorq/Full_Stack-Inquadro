'use client';

import { ProductSearchSkeleton } from '~&/src/widgets/product';
import { SearchQueries } from './search-input.queries';
import { useClickAway, useDebounce } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

const ProductSearch = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSearch),
    {
        ssr: false,
        loading: () => <ProductSearchSkeleton />
    }
);

export const SearchInput = () => {
    const ref = React.useRef(null);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);

    const {
        data: products,
        refetch,
        isLoading,
        isError,
    } = useQuery(SearchQueries.searchByQuery(searchQuery));

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        async () => {
            try {
                await refetch();
            } catch (err) {
                throw new Error(String(err));
            }
        },
        500,
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
            <div className="w-full max-w-[610px] relative" ref={ref}>
                <div
                    className="flex items-center z-20 relative gap-3.5 shadow-sm transition-colors bg-secondary rounded-lg px-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    aria-label="input"
                >
                    <Search className="h-5 w-5" />

                    <Input
                        className="bg-transparent focus-visible:ring-0 placeholder:text-lg px-0 leading-4"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="плитка оникс"
                        onFocus={() => setFocused(true)}
                    />
                </div>

                {!isLoading && !isError && (
                    <div
                        className={cn(
                            'absolute w-full bg-white rounded-[10px] py-2 shadow-md transition-opacity duration-200',
                            'top-[125%] max-h-[550px] overflow-y-auto z-30',
                            focused &&
                                products?.data &&
                                products.data.length > 0
                                ? 'opacity-100 visible'
                                : 'opacity-0 invisible'
                        )}
                    >
                        <div className="flex flex-col w-full h-full">
                            {products?.data?.map(product => (
                                <ProductSearch
                                    key={`product-search-${product.article}`}
                                    onClick={onClickItem}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
