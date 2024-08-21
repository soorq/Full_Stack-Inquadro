import { TypeFilters } from './filter.types';
import { useRouter } from 'next/navigation';
import React from 'react';
import qs from 'qs';

export const useQueryFilters = (filters: TypeFilters) => {
    const isMounted = React.useRef(false); // Хук для отслеживания монтирования компонента
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

            router.push(`?${query}`, { scroll: false });
        }

        isMounted.current = true;
    }, [filters, router]);
};
