import { RecentProducts } from '~&/src/entities/recent-view';
import { ProductLarge } from '~&/src/features/product/large';
import { HintOrder } from '~&/src/widgets/hint-order';
import { ProductApi } from '~&/src/entities/product';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';

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
                <Breadcrumb className="mt-2.5 mb-5">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ProductLarge product={product} />
                <RecentProducts />
            </main>
            <HintOrder />
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
