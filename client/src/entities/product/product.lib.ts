export const getDisplayValue = (
    field: string | { id: number; value: string }[]
): string => {
    if (typeof field === 'string') {
        return field;
    }
    if (Array.isArray(field) && field.length > 0) {
        return field[0].value;
    }
    return 'N/A';
};
