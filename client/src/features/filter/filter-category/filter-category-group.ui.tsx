import { FilterCategoryCheckbox } from './filter-category-checkbox.ui';
import { Skeleton } from '~&/src/shared/ui/skeleton';
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
    defaultItems?: FilterCheckboxProps[];
    className?: string;
    limit?: number;
    selected?: Set<string>;
    loading?: boolean;
    items: FilterCheckboxProps[];
    name?: string;
}) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    if (loading) {
        return (
            <div className={className}>
                {Array.from({ length: limit }).map((_, index) => (
                    <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
                ))}
                <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
            </div>
        );
    }

    const filteredItems = showAll
        ? items.filter(item =>
              item.value.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);

    const handleCheckboxChange = (id: string) => {
        const isSelected = selected.has(id);
        onClickCheckbox?.(id, !isSelected);
    };

    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-[10px]">
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {filteredItems.map((item, index) => (
                    <FilterCategoryCheckbox
                        key={index}
                        onCheckedChange={checked =>
                            handleCheckboxChange(item.value)
                        }
                        checked={selected.has(item.value)}
                        value={item.value}
                        label={item.label}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? 'border-t border-t-neutral-100 mt-4' : ''
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-3"
                    >
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
