'use client';
import { FilterCategory } from './filter-category';
import { useFilters, useQueryFilters } from './filter.lib';

// MockData
import {
    MFilterCategory,
    MFilterAvailable,
    MFilterInvoice,
    MFilterPlating,
    MFilterShade,
    MFilterTexture,
    MFilterUsage
} from './filter.constnants';

export const Filter = () => {
    const filters = useFilters();

    useQueryFilters(filters);

    return (
        <aside className="flex-col flex w-1/4 gap-1.5">
            <FilterCategory
                items={MFilterCategory}
                prefix="filter-category"
                selected={Array.from(filters.category)}
                multiple
                onChange={values =>
                    filters.setFilter('category', values.join(','))
                }
            />

            {/* Фильтр использования */}
            <FilterCategory
                items={MFilterUsage}
                prefix="filter-usage"
                selected={Array.from(filters.usage)}
                multiple
                onChange={values =>
                    filters.setFilter('usage', values.join(','))
                }
            />

            {/* Фильтр наличия */}
            <FilterCategory
                items={MFilterAvailable}
                prefix="filter-available"
                selected={Array.from(filters.available)}
                onChange={values =>
                    filters.setFilter('available', values.join(','))
                }
                multiple
            />

            {/* Другие фильтры */}
            <FilterCategory
                items={MFilterPlating}
                prefix="filter-plating"
                selected={Array.from(filters.plating)}
                onChange={values =>
                    filters.setFilter('plating', values.join(','))
                }
                multiple
            />

            <FilterCategory
                items={MFilterInvoice}
                prefix="filter-invoice"
                selected={Array.from(filters.invoice)}
                onChange={values =>
                    filters.setFilter('invoice', values.join(','))
                }
                multiple
            />

            <FilterCategory
                items={MFilterTexture}
                prefix="filter-texture"
                selected={Array.from(filters.texture)}
                onChange={values =>
                    filters.setFilter('texture', values.join(','))
                }
                multiple
            />

            <FilterCategory
                items={MFilterShade}
                prefix="filter-shade"
                selected={Array.from(filters.shade)}
                onChange={values =>
                    filters.setFilter('shade', values.join(','))
                }
                multiple
            />

            {/*<FilterPrice />*/}
        </aside>
    );
};
