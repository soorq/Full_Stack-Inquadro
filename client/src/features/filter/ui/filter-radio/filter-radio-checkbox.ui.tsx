import { RadioGroupItem } from '~&/src/shared/ui/radio-group';
import { Label } from '~&/src/shared/ui/label';

interface FilterCategoryRadioProps {
    label: string;
    value: string;
}

export const FilterCategoryRadio = ({
    label,
    value
}: FilterCategoryRadioProps) => {
    return (
        <div className="flex items-start h-full">
            <RadioGroupItem
                id={`radio-filter-${value}`}
                className="h-fit"
                value={value}
            ></RadioGroupItem>
            <Label
                htmlFor={`radio-filter-${value}`}
                className="cursor-pointer text-base font-[350] transition-colors delay-100 data-[state=checked]:underline"
            >
                {label}
            </Label>
        </div>
    );
};
