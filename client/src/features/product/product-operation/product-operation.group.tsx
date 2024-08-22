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

    const determinateWords = (text: string) => {
        text = text.replace(/\s*и\s*напольная\s*/, '');
        text = text.replace(/светло-([а-яё]+?)ый/g, 'св.-$1ый');
        return text;
    };

    return (
        <ToggleGroup
            className="sm:flex-row justify-start w-full flex-col gap-1.5 sm:flex-wrap"
            onValueChange={handleChange}
            value={selectedValue}
            type="single"
        >
            {getUniqueOptions(options).map(({ id, value }) => (
                <ToggleGroupItem
                    className="w-full sm:w-fit line-clamp-2 text-sm sm:text-base break-words px-0 sm:px-4 overflow-hidden"
                    aria-selected={id === selectedId || id === highlightId}
                    aria-label={`Button ${value}`}
                    value={value}
                    size="lg"
                    key={id}
                >
                    {determinateWords(value)}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};
