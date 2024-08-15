import { useSearchParams, useRouter } from 'next/navigation';
import { useSet } from 'react-use';
import React from 'react';
import qs from 'qs';
import {
    TypeFilters,
    IReturnFilter,
    TypePrice,
    TypeQueryFilters
} from './filter.types';

const useFilterSet = (param: string | null, defaultValues: string[] = []) => {
    return useSet(new Set<string>(param ? param.split(',') : defaultValues));
};

export const useFilters = (): IReturnFilter => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof TypeQueryFilters,
        string | null
    >;

    const [category, { toggle: toggleCategory }] = useFilterSet(
        searchParams.get('category') || null
    );
    const [usage, { toggle: toggleUsage }] = useFilterSet(
        searchParams.get('usage') || null
    );
    const [available, { toggle: toggleAvailable }] = useFilterSet(
        searchParams.get('available') || null
    );
    const [plating, { toggle: togglePlating }] = useFilterSet(
        searchParams.get('plating') || null
    );
    const [invoice, { toggle: toggleInvoice }] = useFilterSet(
        searchParams.get('invoice') || null
    );
    const [size, { toggle: toggleSize }] = useFilterSet(
        searchParams.get('size') || null
    );
    const [texture, { toggle: toggleTexture }] = useFilterSet(
        searchParams.get('texture') || null
    );
    const [shade, { toggle: toggleShade }] = useFilterSet(
        searchParams.get('shade') || null
    );
    const [wimages, { toggle: toggleWimages }] = useFilterSet(
        searchParams.get('wimages') || null
    );

    const [prices, setPrices] = React.useState<TypePrice>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });

    const updatePrice = (name: keyof TypePrice, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const setFilter = (
        name: keyof Omit<TypeFilters, 'prices'>,
        value: string
    ) => {
        const setter = {
            category: toggleCategory,
            usage: toggleUsage,
            available: toggleAvailable,
            plating: togglePlating,
            invoice: toggleInvoice,
            size: toggleSize,
            texture: toggleTexture,
            shade: toggleShade,
            wimages: toggleWimages
        }[name as keyof Omit<TypeFilters, 'prices'>];

        setter(value);
    };

    return React.useMemo(
        () => ({
            category,
            usage,
            available,
            plating,
            invoice,
            size,
            texture,
            shade,
            wimages,
            prices,
            setPrices: updatePrice,
            setFilter
        }),
        [
            category,
            usage,
            available,
            plating,
            invoice,
            size,
            texture,
            shade,
            wimages,
            prices
        ]
    );
};

export const useQueryFilters = (filters: TypeFilters) => {
    const isMounted = React.useRef(false); // Хук для отслеживания монтирования компонента
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
            // Создаем объект параметров из фильтров
            const params = {
                category: Array.from(filters.category),
                usage: Array.from(filters.usage),
                available: Array.from(filters.available),
                plating: Array.from(filters.plating),
                invoice: Array.from(filters.invoice),
                size: Array.from(filters.size),
                texture: Array.from(filters.texture),
                shade: Array.from(filters.shade),
                wimages: Array.from(filters.wimages),
                priceFrom: filters.prices.priceFrom,
                priceTo: filters.prices.priceTo
            };

            // Преобразуем объект в строку запроса
            const query = qs.stringify(params, {
                arrayFormat: 'comma',
                format: 'RFC1738', // Форматирование для URL
                encoder: str => encodeURIComponent(str)
            });

            // Обновляем URL
            router.push(`?${query}`, { scroll: false });
        }

        // Устанавливаем флаг монтирования в true
        isMounted.current = true;
    }, [filters, router]); // Добавляем router в зависимости

    // Важно добавить очистку эффекта, если требуется
    React.useEffect(() => {
        return () => {
            // Очистка или сброс состояния при размонтировании, если это необходимо
            isMounted.current = false;
        };
    }, []);
};
