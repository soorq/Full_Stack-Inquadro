import { RadioGroupItem } from '~&/src/shared/ui/radio-group';
import { Label } from '~&/src/shared/ui/label';

interface FilterCategoryRadioProps {
    label: string;
    value: string;
    name?: string;
}

export const FilterCategoryRadio = ({
    label,
    value,
    name
}: FilterCategoryRadioProps) => {
    return (
        <div className="flex items-center gap-2.5">
            <RadioGroupItem
                id={`radio-${String(name)}-${String(value)}`}
                className="rounded-full size-5"
                value={value}
            />
            <Label
                htmlFor={`radio-${String(name)}-${String(value)}`}
                className="cursor-pointer text-base font-[350] transition-colors delay-100"
            >
                {label}
            </Label>
        </div>
    );
};
