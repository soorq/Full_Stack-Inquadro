'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import qs from 'qs';
import { filterT } from '~&/src/shared/api/filter';

function useQueryFilters(filters: filterT.TypeFilters) {
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...(filters.category && { category: filters.category }),
                ...(filters.usage.size > 0 && {
                    usage: Array.from(filters.usage)
                }),
                ...(filters.availability.size > 0 && {
                    availability: Array.from(filters.availability)
                }),
                ...(filters.plating.size > 0 && {
                    plating: Array.from(filters.plating)
                }),
                ...(filters.invoice.size > 0 && {
                    invoice: Array.from(filters.invoice)
                }),
                ...(filters.size.size > 0 && {
                    size: Array.from(filters.size)
                }),
                ...(filters.texture.size > 0 && {
                    texture: Array.from(filters.texture)
                }),
                ...(filters.shade.size > 0 && {
                    shade: Array.from(filters.shade)
                }),
                ...(filters.images.size > 0 && {
                    images: Array.from(filters.images)
                })
            };

            const query = qs.stringify(params, { arrayFormat: 'comma' });
            router.push(`?${query}`, { scroll: false });
        }
        isMounted.current = true;
    }, [filters, router]);
}

export { useQueryFilters };
