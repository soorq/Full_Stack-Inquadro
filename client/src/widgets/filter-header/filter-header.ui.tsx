'use client';

import { Funnel, FunnelX, Sliders } from '@phosphor-icons/react';
import { useFiltersStore } from '~&/src/entities/filter';
import { Button } from '~&/src/shared/ui/button';
import { SortSelect } from '../sort-select';

export const FilterHeader = () => {
    const {
        resetFilters,
        hasActiveFilters,
        setOpenCategory,
        setOpenFilters,
        isOpenCategory,
        isOpenFilters
    } = useFiltersStore(state => state);

    const isActiveFilter = hasActiveFilters();

    return (
        <div className="flex md:hidden justify-between py-2.5">
            <div className="flex items-center justify-between max-w-[270px] w-full">
                <div className="flex items-center gap-x-2.5">
                    <Button
                        disabled={isOpenCategory}
                        aria-label="открыть фильтры"
                        className={`size-10 sm:p-1`}
                        onClick={setOpenFilters}
                    >
                        <Sliders
                            weight="light"
                            className="size-5 stroke-1 self-center"
                        />
                    </Button>
                    <Button
                        disabled={isOpenFilters}
                        aria-label="открыть категории"
                        className={`size-10 sm:p-1`}
                        onClick={setOpenCategory}
                    >
                        <Funnel
                            weight="light"
                            className="size-5 stroke-1 self-center"
                        />
                    </Button>
                </div>
                <Button
                    className={`size-10 sm:p-1 shrink-0 ${isActiveFilter ? 'visible' : 'invisible'}`}
                    onClick={resetFilters}
                >
                    <FunnelX
                        weight="light"
                        className="size-5 stroke-1 self-center"
                    />
                </Button>
            </div>
            <SortSelect />
        </div>
    );
};
