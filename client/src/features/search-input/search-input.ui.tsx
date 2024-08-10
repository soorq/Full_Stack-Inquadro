'use client';

import { Input } from '~&/src/shared/ui/input';
import { useClickAway, useDebounce } from 'react-use';
import { Search } from 'lucide-react';
import React from 'react';

export const SearchInput = () => {
    const ref = React.useRef(null);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const [products, setProducts] = React.useState([]);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        async () => {
            try {
            } catch (err) {
                console.log(err);
            }
        },
        250,
        []
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    };

    return (
        <div className="w-full max-w-[610px]">
            <div
                className="flex items-center gap-3.5 shadow-sm transition-colors bg-secondary rounded-lg px-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                aria-label="input"
            >
                <Search className="h-5 w-5" />

                <Input
                    className="border-none shadow-none placeholder:text-lg px-0 h-[50px] text-base leading-4"
                    ref={ref}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="плитка оникс"
                    onFocus={() => setFocused(true)}
                />
            </div>
        </div>
    );
};
