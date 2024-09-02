'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { FilterCategory, useFiltersStore } from '../model';
import { FiltersCheckboxGroup } from './filter-group';
import { FilterQueries } from '../api/filter.queries';
import { FilterRadioGroup } from './filter-radio';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Navbar } from '~&/src/widgets/navbar';
import { FilterSize } from './filter-size';
import { useQueryFilters } from '../lib';
import React from 'react';
import {
    MFilterAvailable,
    MFilterCategory,
    MFilterTexture,
    MFilterInvoice,
    MFilterPlating,
    MFilterShade,
    MFilterUsage,
    MFilterSize
} from '../constnants/filter.constnants';

export const Filter = () => {
    const { data, isLoading } = useSuspenseQuery(
        FilterQueries.categoriesQuery()
    );
    const filters = useFiltersStore(state => state);
    useQueryFilters(filters);

    const handleCheckboxClick = (
        filterName: FilterCategory,
        id: string,
        isSelected: boolean
    ) => {
        if (isSelected) {
            filters.setFilter(filterName, id);
        } else {
            filters.removeFilter(filterName, id);
        }
    };

    const FiltersGroups = () => (
        <div
            className={cn(
                'flex-col gap-1.5 h-full overflow-y-auto scroll-none',
                filters.isOpenFilters ? 'flex' : 'md:flex hidden'
            )}
        >
            <FilterRadioGroup
                onClickRadio={id => filters.setFilter('category', id)}
                className="hidden md:block"
                items={MFilterCategory}
                selected={Array.from(filters.category)[0]}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('usage', id, isSelected)
                }
                defaultItems={MFilterUsage}
                selected={filters.usage}
                loading={isLoading}
                items={data.usage}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('availability', id, isSelected)
                }
                defaultItems={MFilterAvailable}
                selected={filters.availability}
                items={data.availability}
                loading={isLoading}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('plating', id, isSelected)
                }
                defaultItems={MFilterPlating}
                selected={filters.plating}
                items={data.plating}
                loading={isLoading}
            />

            <FilterSize
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('size', id, isSelected)
                }
                defaultItems={MFilterSize}
                selected={filters.size}
                loading={isLoading}
                items={data.size}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('invoice', id, isSelected)
                }
                defaultItems={MFilterInvoice}
                selected={filters.invoice}
                items={data.invoice}
                loading={isLoading}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('texture', id, isSelected)
                }
                defaultItems={MFilterTexture}
                selected={filters.texture}
                items={data.texture}
                loading={isLoading}
                limit={10}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('shade', id, isSelected)
                }
                defaultItems={MFilterShade}
                selected={filters.shade}
                items={data.shade}
                loading={isLoading}
            />
        </div>
    );

    return (
        <aside
            className={cn(
                'md:flex flex-col justify-start w-full max-w-[270px]',
                filters.isOpenFilters || filters.isOpenCategory
                    ? 'translate-y-0  visible  relative'
                    : 'translate-y-full absolute invisible md:relative md:translate-y-0 md:visible'
            )}
        >
            <div className="w-full py-2.5 hidden md:block">
                <Navbar />
            </div>

            <FiltersGroups />

            <FilterRadioGroup
                onClickRadio={id => filters.setFilter('category', id)}
                className={cn(
                    filters.isOpenCategory && filters.isOpenFilters === false
                        ? 'block'
                        : 'hidden md:hidden'
                )}
                items={MFilterCategory}
                selected={Array.from(filters.category)[0]}
            />
        </aside>
    );
};
