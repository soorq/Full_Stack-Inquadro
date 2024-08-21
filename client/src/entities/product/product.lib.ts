import type { ProductApi, ProductClient } from './product.types';

export const transformProductClientDto = (
    productApi: ProductApi,
    selectedId?: number
): ProductClient => {
    const getDefaultValue = (
        field: string | { id: number; value: string }[] | null
    ): string => {
        if (typeof field === 'string') {
            const valuesArray = field.split(', ').map(item => item.trim());
            return valuesArray[0] ?? '';
        }
        if (Array.isArray(field) && field.length > 0) {
            if (selectedId !== undefined) {
                const item = field.find(f => f.id === selectedId);
                if (item) return item.value;
            }
            return field[0].value;
        }
        return '';
    };

    const transform = (
        field: string | { id: number; value: string }[] | null
    ): string => getDefaultValue(field);

    return {
        name: transform(productApi.name),
        category: transform(productApi.category),
        availability: transform(productApi.availability),
        images: transform(productApi.image),
        usage: transform(productApi.usage),
        plating: transform(productApi.plating),
        texture: transform(productApi.texture),
        invoice: transform(productApi.invoice),
        size: transform(productApi.size),
        country: transform(productApi.country),
        price: transform(productApi.price),
        manufacturing: transform(productApi.manufacturing),
        kit: transform(productApi.kit),
        shade: transform(productApi.shade),
        article: transform(productApi.article),
        slug: transform(productApi.slug)
    };
};
