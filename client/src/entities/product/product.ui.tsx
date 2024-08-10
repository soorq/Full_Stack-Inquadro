import { LargeProduct, SmallProduct } from '~&/src/widgets/product';
import type { variants } from './product.types';

const images = [
    '/product/main.png',
    '/product/color.png',
    '/product/color.png',
    '/product/color.png'
];

const smallData = {
    image: '/product/main.png',
    sell: '15%',
    price: '1050',
    id: '534534',
    name: 'Avalanche',
    availability: 'В наличие',
    category: 'Керамическая плитка',
    total: '28 шт'
};

export const ProductPreview = ({ variant = 'lg' }: { variant?: variants }) => {
    return variant === 'lg' ? (
        <LargeProduct slides={images} />
    ) : (
        <SmallProduct product={smallData} />
    );
};
