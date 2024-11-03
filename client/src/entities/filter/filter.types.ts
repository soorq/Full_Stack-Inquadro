import { filterT } from '~&/src/shared/api/filter';

export type TypeFilterActions = {
    setFilter: (
        name: keyof Omit<filterT.TypeFilters, 'prices'>,
        value: string
    ) => void;
    removeFilter: (
        name: keyof Omit<filterT.TypeFilters, 'prices'>,
        value: string
    ) => void;
    hasActiveFilters: () => boolean;
    setOpenCategory: () => void;
    setOpenFilters: () => void;
    resetFilters: () => void;
};

export type TypeFilterState = {
    isOpenCategory: boolean;
    isOpenFilters: boolean;
} & filterT.TypeFilters;
