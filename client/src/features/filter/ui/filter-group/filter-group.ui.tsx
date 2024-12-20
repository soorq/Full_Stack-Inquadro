import { FilterCheckbox } from './filter-group-checkbox.ui';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { Button } from '~&/src/shared/ui/button';
import { useState } from 'react';

export interface FilterCheckboxProps {
    label: string;
    value: string;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FiltersCheckboxGroup = ({
    onClickCheckbox,
    defaultItems,
    className = '',
    limit = 5,
    selected = new Set<string>(),
    loading = false,
    items,
    name
}: {
    onClickCheckbox?: (id: string, isSelected: boolean) => void;
    defaultItems?: { label: string; value: string }[];
    items: FilterCheckboxProps[];
    selected?: Set<string>;
    className?: string;
    loading?: boolean;
    limit?: number;
    name?: string;
}) => {
    const [showAll, setShowAll] = useState(false);

    if (loading) {
        return (
            <div className={className}>
                {Array.from({ length: limit }).map((_, index) => (
                    <Skeleton key={index} className="h-6 rounded-[8px]" />
                ))}
                <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
            </div>
        );
    }

    const filteredItems = showAll
        ? (items ?? defaultItems)
        : (items ?? defaultItems).slice(0, limit);

    const handleCheckboxChange = (id: string) => {
        const isSelected = selected.has(id);
        onClickCheckbox?.(id, !isSelected);
    };

    return (
        <div className="bg-secondary p-4 flex flex-col rounded-[10px]">
            <div className="flex flex-col gap-2.5 max-h-96 pr-2 overflow-auto scrollbar">
                {filteredItems.map((item, index) => (
                    <FilterCheckbox
                        onCheckedChange={() => handleCheckboxChange(item.value)}
                        checked={selected.has(item.value)}
                        value={item.value}
                        label={item.label}
                        name={name}
                        key={index}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? 'border-t border-t-neutral-100 mt-1.5' : ''
                    }
                >
                    <Button
                        role="button"
                        type="button"
                        variant={'link'}
                        className="text-primary sm:px-0 mt-1 text-center"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Скрыть' : 'Показать все'}
                    </Button>
                </div>
            )}
        </div>
    );
};
