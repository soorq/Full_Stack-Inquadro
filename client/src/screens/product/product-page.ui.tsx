import { RecentProducts } from '~&/src/features/recent-products';
import { ProductApi } from '~&/src/entities/product';
import { ProductLarge } from '~&/src/widgets/product';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

const images = [
    '/product/main.png',
    '/product/color.png',
    '/product/color.png',
    '/product/color.png'
];

export const ProductPage = ({ product }: { product: ProductApi }) => {
    return (
        <>
            <Header />
            {/*<ProductLarge slides={images} product={product} />*/}
            {/*<RecentProducts />*/}
            <Footer />
        </>
    );
};
