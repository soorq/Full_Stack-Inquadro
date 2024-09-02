import { ToggleGroup, ToggleGroupItem } from '~&/src/shared/ui/toggle-group';

export const FilterSize = ({
    items,
    defaultItems,
    loading,
    onClickCheckbox,
    selected
}: {
    onClickCheckbox?: (id: string, isSelected: boolean) => void;
    defaultItems?: { label: string; value: string }[];
    selected?: Set<string>;
    loading?: boolean;
    items: { label: string; value: string }[];
}) => {
    const initial = items || defaultItems;

    const valueArray = Array.from(selected || []);

    return (
        <div className="bg-secondary p-4 flex flex-col rounded-[10px]">
            <ToggleGroup
                type="multiple"
                className="grid grid-cols-[repeat(3,1fr)] auto-rows-fr"
                value={valueArray}
                onValueChange={values => {
                    // Сначала очищаем все выбранные элементы
                    selected?.forEach(value => {
                        if (!values.includes(value)) {
                            onClickCheckbox?.(value, false);
                        }
                    });

                    values.forEach(value => {
                        if (!selected?.has(value)) {
                            onClickCheckbox?.(value, true);
                        }
                    });
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
