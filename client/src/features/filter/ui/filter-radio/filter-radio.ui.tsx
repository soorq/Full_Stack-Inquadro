import { FilterCategoryRadio } from './filter-radio-checkbox.ui';
import { RadioGroup } from '~&/src/shared/ui/radio-group';
import { cn } from '~&/src/shared/lib/tw-merge';

export const FilterRadioGroup = ({
    onClickRadio,
    className,
    selected,
    items
}: {
    onClickRadio?: (id: string) => void;
    className?: string;
    items: { label: string; value: string }[];
    selected?: string;
}) => {
    const handleRadioChange = (value: string) => {
        onClickRadio?.(value);
    };

    return (
        <div
            className={cn(
                'bg-secondary p-4 flex flex-col rounded-[10px]',
                className
            )}
        >
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                <RadioGroup value={selected} onValueChange={handleRadioChange}>
                    {items.map((item, index) => (
                        <FilterCategoryRadio
                            label={item.label}
                            value={item.value}
                            key={index}
                        />
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
};
