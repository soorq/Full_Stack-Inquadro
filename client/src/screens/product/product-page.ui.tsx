import { RecentProducts } from '~&/src/entities/recent-view';
import { ProductLarge } from '~&/src/widgets/product';
import { ProductApi } from '~&/src/entities/product';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const ProductPage = ({ product }: { product: ProductApi }) => {
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: `Купите ${product.name} — высококачественную ${product.category}, идеально подходящую для ${product.usage}. Эта плитка доступна ${product.availability} состоянии и стоит ${product.price} за единицу. Производство: ${product.country}. Идеально подходит для создания стильных интерьеров и долговечного покрытия.`,
        offers: {
            '@type': 'AggregateOffer',
            availability: product.availability
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            priceCurrency: product.price
            // highPrice: product.priceRange.maxVariantPrice.amount,
            // lowPrice: product.priceRange.minVariantPrice.amount
        }
    };

    return (
        <>
            <Header />
            <main className="w-full container h-full">
                <ProductLarge product={product} />
                <RecentProducts />
            </main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd)
                }}
            />
            <Footer />
        </>
    );
};
