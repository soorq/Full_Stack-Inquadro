// import type { ProductApi, variants } from './product.types';
// import dynamic from 'next/dynamic';
//
// const ProductSmall = dynamic(() =>
//     import('~&/src/widgets/product').then(cn => cn.ProductSmall)
// );
// const ProductLarge = dynamic(() =>
//     import('~&/src/widgets/product').then(cn => cn.ProductLarge)
// );
//
//
// const smallData = {
//     image: '/product/main.png',
//     sell: '15%',
//     price: '1050',
//     id: '534534',
//     name: 'Avalanche',
//     availability: 'В наличие',
//     category: 'Керамическая плитка',
//     total: '28 шт'
// };
//
// export const ProductPreview = ({
//     variant = 'lg',
//     product
// }: {
//     variant?: variants;
//     product: ProductApi;
// }) => {
//     return variant === 'lg' ? (
//         <ProductLarge product slides={images} />
//     ) :
// };
