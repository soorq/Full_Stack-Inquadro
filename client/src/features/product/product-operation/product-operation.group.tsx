import { ToggleGroup, ToggleGroupItem } from '~&/src/shared/ui/toggle-group';
import type { DynamicOption } from '~&/src/entities/product';
import { getUniqueOptions } from './product-operation.lib';
import { useEffect, useState } from 'react';

export const OptionGroup = ({
    options,
    selectedId,
    highlightId,
    onChange
}: {
    options: DynamicOption[];
    selectedId?: number;
    highlightId?: number;
    onChange: (id: number) => void;
}) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        const option = options.find(option => option.id === selectedId);
        if (option) {
            setSelectedValue(option.value);
        } else {
            setSelectedValue(undefined);
        }
    }, [selectedId, options]);

    const handleChange = (value: string) => {
        const option = options.find(option => option.value === value);
        if (option) {
            setSelectedValue(value);
            onChange(option.id);
        }
    };

    return (
        <ToggleGroup
            className="sm:flex-row justify-start flex-col gap-1.5 sm:flex-wrap"
            type="single"
            value={selectedValue}
            onValueChange={handleChange}
        >
            {getUniqueOptions(options).map(({ id, value }) => (
                <ToggleGroupItem
                    key={id}
                    value={value}
                    size="lg"
                    className="w-full sm:w-fit line-clamp-2"
                    aria-label={`Button ${value}`}
                    aria-selected={id === selectedId || id === highlightId}
                >
                    {value}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};
