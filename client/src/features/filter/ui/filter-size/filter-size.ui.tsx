import { ToggleGroup, ToggleGroupItem } from '~&/src/shared/ui/toggle-group';

export const FilterSize = ({
    items,
    className,
    defaultItems,
    limit,
    loading,
    name,
    onClickCheckbox,
    selected
}: {
    onClickCheckbox?: (id: string, isSelected: boolean) => void;
    defaultItems?: { label: string; value: string }[];
    className?: string;
    limit?: number;
    selected?: Set<string>;
    loading?: boolean;
    items: { label: string; value: string }[];
    name?: string;
}) => {
    const initial = (defaultItems || items).slice(0, limit);

    const handleCheckboxChange = (value: string) => {
        const isSelected = selected?.has(value) || false;
        onClickCheckbox?.(value, !isSelected);
    };

    return (
        <div className="bg-secondary p-4 flex flex-col rounded-[10px]">
            <ToggleGroup
                type="multiple"
                className="flex-wrap justify-start"
                defaultValue={Array.from(selected || [])}
                onValueChange={values => {
                    values.forEach(handleCheckboxChange);
                }}
            >
                {initial.map(size => (
                    <ToggleGroupItem
                        key={`filter-size-${size.value}`}
                        value={size.value}
                    >
                        {size.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
};
