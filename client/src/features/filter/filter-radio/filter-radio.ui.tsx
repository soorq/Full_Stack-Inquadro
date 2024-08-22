import { FilterCategoryRadio } from './filter-radio-checkbox.ui';
import { RadioGroup } from '~&/src/shared/ui/radio-group';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { useState } from 'react';

export interface FilterRadioProps {
    label: string;
    value: string; // This is used as ID
    name?: string;
}

export const FilterRadioGroup = ({
    onClickRadio,
    defaultItems,
    className = '',
    limit = 5,
    loading = false,
    selected,
    items,
    name
}: {
    onClickRadio?: (id: string) => void;
    defaultItems?: FilterRadioProps[];
    className?: string;
    limit?: number;
    loading?: boolean;
    items: FilterRadioProps[];
    selected?: string; // Selected value to manage which radio is checked
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

    const handleRadioChange = (value: string) => {
        onClickRadio?.(value);
    };

    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-[10px]">
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                <RadioGroup value={selected} onValueChange={handleRadioChange}>
                    {filteredItems.map((item, index) => (
                        <FilterCategoryRadio
                            value={item.value}
                            label={item.label}
                            name={name}
                            key={index}
                        />
                    ))}
                </RadioGroup>
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
