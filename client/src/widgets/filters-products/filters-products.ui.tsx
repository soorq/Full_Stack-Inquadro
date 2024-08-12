import { ProductSmallSkeleton } from '~&/src/widgets/product';
import dynamic from 'next/dynamic';

const ProductSmall = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSmall),
    {
        ssr: false,
        loading: () => <ProductSmallSkeleton />
    }
);

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

export const FiltersProducts = () => {
    return (
        <div className="grid grid-cols-[repeat(3,295px)] gap-x-5 gap-y-8 grid-rows-3">
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
            <ProductSmall product={smallData} />
        </div>
    );
};
