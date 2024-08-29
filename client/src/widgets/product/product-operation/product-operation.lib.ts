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
export const filterOptionsByIds = (
    options: Option[],
    ids: number[]
): Option[] => {
    return options.filter(option => ids.includes(option.id));
};

// Вспомогательная функция для получения связанных ID по значению размера
export const getRelatedSizeIds = (
    sizeOptions: Option[],
    sizeId: number
): number[] => {
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

// Функция для преобразования данных в массив Option[]
const toOptionArray = (
    data: string | { id: number; value: string }[]
): Option[] => {
    if (typeof data === 'string') {
        return [{ id: 0, value: data }];
    }

    if (Array.isArray(data) && typeof data[0] === 'object') {
        return data as { id: number; value: string }[];
    }

    return [];
};

export const getOptions = (
    data: string | { id: number; value: string }[],
    getSize?: boolean
): Option[] => {
    const options = toOptionArray(data);
    return getSize ? getSizeOptions(options) : options;
};
