'use client';

import { FiltersCheckboxGroup } from './filter-group';
import { FilterRadioGroup } from './filter-radio';
import { Navbar } from '~&/src/widgets/navbar';
import React from 'react';
import {
    useFiltersStore,
    useQueryFilters,
    filterTypes
} from '~&/src/entities/filter';
import {
    MFilterAvailable,
    MFilterCategory,
    MFilterTexture,
    MFilterInvoice,
    MFilterPlating,
    MFilterShade,
    MFilterUsage
} from './filter.constnants';

export const Filter = () => {
    const filters = useFiltersStore(state => state);
    useQueryFilters(filters);

    const handleCheckboxClick = (
        filterName: filterTypes.FilterCategory,
        id: string,
        isSelected: boolean
    ) => {
        if (isSelected) {
            filters.setFilter(filterName, id);
        } else {
            filters.removeFilter(filterName, id);
        }
    };

    const handleRadioClick = (
        filterName: filterTypes.FilterCategory,
        id: string
    ) => {
        filters.setFilter(filterName, id);
    };

    return (
        <aside className="hidden md:flex flex-col justify-start w-full max-w-[270px]">
            <Navbar />

            <div className="flex-col flex gap-1.5 max-h-[90dvh] h-full overflow-y-auto scroll-none">
                <FilterRadioGroup
                    onClickRadio={id => handleRadioClick('category', id)}
                    items={MFilterCategory}
                />

                <FiltersCheckboxGroup
                    onClickCheckbox={(id, isSelected) =>
                        handleCheckboxClick('usage', id, isSelected)
                    }
                    items={MFilterUsage}
                    selected={filters.usage}
                />
                <FiltersCheckboxGroup
                    onClickCheckbox={(id, isSelected) =>
                        handleCheckboxClick('availability', id, isSelected)
                    }
                    items={MFilterAvailable}
                    selected={filters.availability}
                />

                <FiltersCheckboxGroup
                    onClickCheckbox={(id, isSelected) =>
                        handleCheckboxClick('plating', id, isSelected)
                    }
                    items={MFilterPlating}
                    selected={filters.plating}
                />

                <FiltersCheckboxGroup
                    onClickCheckbox={(id, isSelected) =>
                        handleCheckboxClick('invoice', id, isSelected)
                    }
                    items={MFilterInvoice}
                    selected={filters.invoice}
                />

                <FiltersCheckboxGroup
                    onClickCheckbox={(id, isSelected) =>
                        handleCheckboxClick('texture', id, isSelected)
                    }
                    items={MFilterTexture}
                    selected={filters.texture}
                    limit={10}
                />

                <FiltersCheckboxGroup
                    onClickCheckbox={(id, isSelected) =>
                        handleCheckboxClick('shade', id, isSelected)
                    }
                    items={MFilterShade}
                    selected={filters.shade}
                />
            </div>
        </aside>
    );
};
