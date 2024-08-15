import { ProductService } from '~&/src/shared/api/product';
import { getProduct } from './action';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/product/product-page.ui').then(
        page => page.ProductPage
    )
);

type Props = { slug: string };

export async function generateStaticParams() {
    const products = await ProductService.productsQuery();
    return products.data?.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({
    params
}: {
    params: Props;
}): Promise<Metadata> {
    const product = await ProductService.productQuery(params.slug);

    return {
        title: product.data.name,
        description: `Купите ${product.data.name} — высококачественную ${product.data.category}, идеально подходящую для ${product.data.usage}. Эта плитка доступна ${product.data.availability} состоянии и стоит ${product.data.price} за единицу. Производство: ${product.data.country}. Идеально подходит для создания стильных интерьеров и долговечного покрытия.`,
        openGraph: {
            title: `Inquadro | ${product.data.name}`,
            description: `Купите ${product.data.name} — высококачественную ${product.data.category}, идеально подходящую для ${product.data.usage}. Эта плитка доступна ${product.data.availability} состоянии и стоит ${product.data.price} за единицу. Производство: ${product.data.country}. Идеально подходит для создания стильных интерьеров и долговечного покрытия.`
        },
        authors: {
            name: 'Danil or Soorq'
        }
    };
}

export default async function ProductPage({ params }: { params: Props }) {
    const product = await getProduct(params.slug);
    return <Page product={product} />;
}
