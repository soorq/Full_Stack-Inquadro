'use client';

import { CaretDown, SlidersHorizontal } from '@phosphor-icons/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '~&/src/shared/ui/select';
import * as React from 'react';

export const SortSelect = () => {
    const [value, setValue] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setValue(searchParams.get('sort') || '');
    }, [searchParams]);

    const handleChange = (value: string) => {
        setValue(value);
        const params = new URLSearchParams(window.location.search);
        params.set('sort', value);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Select onValueChange={handleChange} value={value}>
            <SelectTrigger
                className="self-end md:w-[182px] md:gap-2.5 p-1.5 md:py-2.5 md:px-4"
                icon={
                    <>
                        <CaretDown className="hidden size-4 md:block opacity-50 transform delay-100 transition-transform" />
                        <SlidersHorizontal className="block size-5 md:hidden transform delay-100 transition-transform shrink-0" />
                    </>
                }
            >
                <SelectValue placeholder="сортировать по" />
            </SelectTrigger>
            <SelectContent className="bg-primary text-white w-[--radix-popover-trigger-width] font-[350] border-none">
                <SelectGroup>
                    <SelectItem value="available">по доступным</SelectItem>
                    <SelectItem value="premium">по премиальным</SelectItem>
                    <SelectItem value="new">по новым</SelectItem>
                    <SelectItem value="popularity">по популярным</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
