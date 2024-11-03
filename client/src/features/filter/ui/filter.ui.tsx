'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { FiltersCheckboxGroup } from './filter-group';
import { filterT } from '~&/src/shared/api/filter';
import { FilterRadioGroup } from './filter-radio';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Navbar } from '~&/src/widgets/navbar';
import { FilterSize } from './filter-size';
import React from 'react';
import {
    FilterQueries,
    MFilterAvailable,
    MFilterCategory,
    MFilterInvoice,
    MFilterPlating,
    MFilterShade,
    MFilterSize,
    MFilterTexture,
    MFilterUsage,
    useFiltersStore,
    useQueryFilters
} from '~&/src/entities/filter';

export const Filter = () => {
    const {
        data: { data },
        isLoading,
        isPending
    } = useSuspenseQuery(FilterQueries.categoryQuery());
    const filters = useFiltersStore(state => state);
    useQueryFilters(filters);

    const handleCheckboxClick = (
        filterName: filterT.FilterCategory,
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
                key=""
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('usage', id, isSelected)
                }
                defaultItems={MFilterUsage}
                selected={filters.usage}
                loading={isLoading ?? isPending}
                items={data.usage}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('availability', id, isSelected)
                }
                defaultItems={MFilterAvailable}
                selected={filters.availability}
                items={data.availability}
                loading={isLoading ?? isPending}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('plating', id, isSelected)
                }
                defaultItems={MFilterPlating}
                selected={filters.plating}
                items={data.plating}
                loading={isLoading ?? isPending}
            />

            <FilterSize
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('size', id, isSelected)
                }
                defaultItems={MFilterSize}
                selected={filters.size}
                loading={isLoading ?? isPending}
                items={data.size}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('invoice', id, isSelected)
                }
                defaultItems={MFilterInvoice}
                selected={filters.invoice}
                items={data.invoice}
                loading={isLoading ?? isPending}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('texture', id, isSelected)
                }
                defaultItems={MFilterTexture}
                selected={filters.texture}
                items={data.texture}
                loading={isLoading ?? isPending}
                limit={10}
            />

            <FiltersCheckboxGroup
                onClickCheckbox={(id, isSelected) =>
                    handleCheckboxClick('shade', id, isSelected)
                }
                defaultItems={MFilterShade}
                selected={filters.shade}
                items={data.shade}
                loading={isLoading ?? isPending}
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
