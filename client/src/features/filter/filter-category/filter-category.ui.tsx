import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';
import { cn } from '~&/src/shared/lib/tw-merge';

export const FilterCategory = ({
    items,
    selected = [],
    onChange,
    multiple = false,
    prefix
}: {
    items: { label: string; value: string }[];
    selected: string[]; // Массив выбранных значений
    onChange: (values: string[]) => void; // Обновленный тип для `onChange`, который принимает массив
    multiple?: boolean; // Поддержка множественного выбора
    prefix: string;
}) => {
    const handleChange = (value: string) => {
        if (multiple) {
            // Обрабатываем множественный выбор
            if (selected.includes(value)) {
                // Если значение уже выбрано, удаляем его
                onChange(selected.filter(item => item !== value));
            } else {
                // Если значение не выбрано, добавляем его
                onChange([...selected, value]);
            }
        } else {
            // Одиночный выбор
            onChange([value]);
        }
    };

    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            {items.map(item => (
                <div
                    key={`${prefix}-${item.value}`}
                    className="flex items-center gap-2.5"
                >
                    <Checkbox
                        id={`${prefix}-${item.value}`}
                        checked={selected.includes(item.value)} // Проверяем, выбран ли элемент
                        onCheckedChange={() => handleChange(item.value)}
                    />
                    <Label
                        htmlFor={`${prefix}-${item.value}`}
                        className={cn(
                            'cursor-pointer transition-colors delay-100',
                            selected.includes(item.value)
                                ? 'text-red-500'
                                : 'text-primary hover:text-primary/60'
                        )}
                    >
                        {item.label}
                    </Label>
                </div>
            ))}
        </div>
    );
};
