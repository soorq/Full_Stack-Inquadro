import { useFilters, useQueryFilters } from './filter.lib';
import { FiltersCheckboxGroup } from './filter-category';
import {
    MFilterAvailable,
    MFilterTexture,
    MFilterInvoice,
    MFilterPlating,
    MFilterShade,
    MFilterUsage
} from './filter.constnants';
import React from 'react';

export const Filter = () => {
    const filters = useFilters();
    useQueryFilters(filters);

    return (
        <aside className="flex-col flex w-full gap-1.5">
            <FiltersCheckboxGroup
                onClickCheckbox={(id: string) => filters.setFilter('usage', id)}
                items={MFilterUsage}
                selected={filters.usage}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id: string) =>
                    filters.setFilter('available', id)
                }
                items={MFilterAvailable}
                selected={filters.available}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id: string) =>
                    filters.setFilter('plating', id)
                }
                items={MFilterPlating}
                selected={filters.plating}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id: string) =>
                    filters.setFilter('invoice', id)
                }
                items={MFilterInvoice}
                selected={filters.invoice}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id: string) =>
                    filters.setFilter('texture', id)
                }
                items={MFilterTexture}
                selected={filters.texture}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id: string) => filters.setFilter('shade', id)}
                items={MFilterShade}
                selected={filters.shade}
            />
        </aside>
    );
};
