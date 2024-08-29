'use client';

import { useRouter } from 'next/navigation';
import { TypeFilters } from '../model';
import React from 'react';
import qs from 'qs';

export const useQueryFilters = (filters: TypeFilters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                category: Array.from(filters.category),
                usage: Array.from(filters.usage),
                availability: Array.from(filters.availability),
                plating: Array.from(filters.plating),
                invoice: Array.from(filters.invoice),
                size: Array.from(filters.size),
                texture: Array.from(filters.texture),
                shade: Array.from(filters.shade),
                images: Array.from(filters.images)
            };
            const query = qs.stringify(params, {
                arrayFormat: 'comma'
            });
            router.push(`?${query}`);
        }
        isMounted.current = true;
    }, [filters]);
};
