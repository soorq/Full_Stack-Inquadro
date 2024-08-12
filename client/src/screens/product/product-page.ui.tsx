import { RecentProducts } from '~&/src/features/recent-products';
import { ProductPreview } from '~&/src/entities/product';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const ProductPage = ({ slug }: { slug: string }) => {
    return (
        <>
            <Header />
            <ProductPreview slug={slug} variant="lg" />
            <RecentProducts />
            <Footer />
        </>
    );
};
