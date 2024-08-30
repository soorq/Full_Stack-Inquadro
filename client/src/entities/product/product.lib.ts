import type { ProductApi, ProductClient } from './product.types';

export const transformProductClientDto = (
    productApi: ProductApi,
    selectedId?: number
): ProductClient => {
    const transformToString = (
        field: unknown | { id: number; value: string }[] | null
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

    const getNumberValue = (
        field: number | { id: number; value: number }[] | null
    ): number => {
        if (typeof field === 'number') {
            return field;
        }
        if (Array.isArray(field) && field.length > 0) {
            if (selectedId !== undefined) {
                const item = field.find(f => f.id === selectedId);
                if (item) return item.value;
            }
            return field[0].value;
        }
        return 0;
    };

    const transformImages = (): string[] => {
        if (Array.isArray(productApi.images)) {
            if (selectedId !== undefined) {
                const selectedImageGroup = productApi.images.find(
                    group => group.id === selectedId
                );
                if (selectedImageGroup) return selectedImageGroup.links;
            }
            return productApi.images.length > 0
                ? productApi.images[0].links
                : [];
        }
        return [];
    };

    return {
        name: transformToString(productApi.name),
        category: transformToString(productApi.category),
        availability: transformToString(productApi.availability),
        images: transformImages(),
        usage: transformToString(productApi.usage),
        textureType: null,
        plating: transformToString(productApi.plating),
        texture: transformToString(productApi.texture),
        invoice: transformToString(productApi.invoice),
        size: transformToString(productApi.size),
        country: transformToString(productApi.country),
        price: getNumberValue(productApi.price),
        manufacturing: transformToString(productApi.manufacturing),
        kit: transformToString(productApi.kit),
        shade: transformToString(productApi.shade),
        article: transformToString(productApi.article),
        slug: transformToString(productApi.slug)
    };
};
