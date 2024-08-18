import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';
import React from 'react';

interface FilterCategoryCheckboxProps {
    onCheckedChange: (checked: boolean) => void;
    checked: boolean;
    label: string;
    value: string;
    name?: string;
}

export const FilterCategoryCheckbox = ({
    onCheckedChange,
    checked,
    label,
    value,
    name
}: FilterCategoryCheckboxProps) => {
    return (
        <div className="flex items-center gap-2.5">
            <Checkbox
                onCheckedChange={onCheckedChange}
                id={`checkbox-${String(name)}-${String(value)}`}
                checked={checked}
                className="rounded-[5px] size-5"
            />
            <Label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className="cursor-pointer text-base font-[350] transition-colors delay-100"
            >
                {label}
            </Label>
        </div>
    );
};
