import type { DynamicOption } from '~&/src/entities/product';

export const getUniqueOptions = (options: DynamicOption[]): DynamicOption[] => {
    const seen = new Set<string>();
    return options.filter(option => {
        if (seen.has(option.value)) return false;
        seen.add(option.value);
        return true;
    });
};

interface Option {
    id: number;
    value: string;
}

// Вспомогательная функция для фильтрации опций
export const filterOptionsByIds = (options: Option[], ids: number[]): Option[] => {
    return options.filter(option => ids.includes(option.id));
};

// Вспомогательная функция для получения связанных ID по значению размера
export const getRelatedSizeIds = (sizeOptions: Option[], sizeId: number): number[] => {
    const selectedSizeValue = sizeOptions.find(
        size => size.id === sizeId
    )?.value;
    return sizeOptions
        .filter(size => size.value === selectedSizeValue)
        .map(size => size.id);
};

// Функция для преобразования size в массив опций
export const getSizeOptions = (size: Option[] | string): Option[] => {
    return typeof size === 'string' ? [] : size;
};
