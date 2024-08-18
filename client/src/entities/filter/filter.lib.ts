import { useSearchParams, useRouter } from 'next/navigation';
import { useFiltersStore } from './filter.model';
import { useSet } from 'react-use';
import React from 'react';
import qs from 'qs';
import { filterTypes } from '~&/src/entities/filter';

// Hook для управления множественными фильтрами
const useFilterSet = (param: string | null, defaultValues: string[] = []) => {
    return useSet(new Set<string>(param ? param.split(',') : defaultValues));
};

export const useFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { prices, setFilter, setPrices, resetFilters, hasActiveFilters } =
        useFiltersStore();

    // Инициализируем состояния фильтров
    const [categorySet, { toggle: toggleCategory }] = useFilterSet(
        searchParams.get('category') || null
    );
    const [usageSet, { toggle: toggleUsage }] = useFilterSet(
        searchParams.get('usage') || null
    );
    const [availableSet, { toggle: toggleAvailable }] = useFilterSet(
        searchParams.get('available') || null
    );
    const [platingSet, { toggle: togglePlating }] = useFilterSet(
        searchParams.get('plating') || null
    );
    const [invoiceSet, { toggle: toggleInvoice }] = useFilterSet(
        searchParams.get('invoice') || null
    );
    const [sizeSet, { toggle: toggleSize }] = useFilterSet(
        searchParams.get('size') || null
    );
    const [textureSet, { toggle: toggleTexture }] = useFilterSet(
        searchParams.get('texture') || null
    );
    const [shadeSet, { toggle: toggleShade }] = useFilterSet(
        searchParams.get('shade') || null
    );
    const [wimagesSet, { toggle: toggleWimages }] = useFilterSet(
        searchParams.get('wimages') || null
    );

    React.useEffect(() => {
        // Функция для инициализации фильтров из URL
        const initFilters = (
            name: keyof filterTypes.TypeFilters,
            setter: (value: string) => void
        ) => {
            const paramValue = searchParams.get(name);
            if (paramValue) {
                paramValue.split(',').forEach(value => setter(value));
            }
        };

        initFilters('category', toggleCategory);
        initFilters('usage', toggleUsage);
        initFilters('available', toggleAvailable);
        initFilters('plating', togglePlating);
        initFilters('invoice', toggleInvoice);
        initFilters('size', toggleSize);
        initFilters('texture', toggleTexture);
        initFilters('shade', toggleShade);
        initFilters('wimages', toggleWimages);
    }, [
        searchParams,
        toggleCategory,
        toggleUsage,
        toggleAvailable,
        togglePlating,
        toggleInvoice,
        toggleSize,
        toggleTexture,
        toggleShade,
        toggleWimages
    ]);

    React.useEffect(() => {
        // Обновление URL с фильтрами
        const updateURL = () => {
            const params: any = {
                category: Array.from(categorySet),
                usage: Array.from(usageSet),
                available: Array.from(availableSet),
                plating: Array.from(platingSet),
                invoice: Array.from(invoiceSet),
                size: Array.from(sizeSet),
                texture: Array.from(textureSet),
                shade: Array.from(shadeSet),
                wimages: Array.from(wimagesSet),
                priceFrom: prices.priceFrom,
                priceTo: prices.priceTo
            };

            // Удаление параметров, которые не используются (например, пустые массивы)
            Object.keys(params).forEach(key => {
                if (
                    params[key] === undefined ||
                    params[key] === null ||
                    (Array.isArray(params[key]) && params[key].length === 0)
                ) {
                    delete params[key];
                }
            });

            const query = qs.stringify(params, { arrayFormat: 'comma' });

            if (hasActiveFilters()) {
                router.replace(`?${query}`, { scroll: false });
            } else {
                router.replace('/', { scroll: false });
            }
        };

        updateURL();
    }, [
        categorySet,
        usageSet,
        availableSet,
        platingSet,
        invoiceSet,
        sizeSet,
        textureSet,
        shadeSet,
        wimagesSet,
        prices,
        hasActiveFilters,
        router
    ]);

    const updatePrice = (name: keyof filterTypes.TypePrice, value: number) => {
        setPrices(name, value);
    };

    const setFilterHandler = (
        name: keyof Omit<filterTypes.TypeFilters, 'prices'>,
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
        }[name as keyof Omit<filterTypes.TypeFilters, 'prices'>];

        setter(value);
        setFilter(name, value);
    };

    return {
        category: categorySet,
        usage: usageSet,
        available: availableSet,
        plating: platingSet,
        invoice: invoiceSet,
        size: sizeSet,
        texture: textureSet,
        shade: shadeSet,
        wimages: wimagesSet,
        prices,
        setPrices: updatePrice,
        setFilter: setFilterHandler,
        resetFilters
    };
};
