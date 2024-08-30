import { NOT_IMAGE } from '~&/src/shared/contants/gateway';

export const filterValidImages = (images: string[] | undefined): string[] => {
    const validImageExtensions = ['.jpg', '.jpeg', '.png', '.avif', '.webp'];

    if (!images || images.length === 0) {
        return Array.from({ length: 3 }, () => NOT_IMAGE);
    }

    return images.filter(image =>
        validImageExtensions.some(ext => image.toLowerCase().endsWith(ext))
    );
};
