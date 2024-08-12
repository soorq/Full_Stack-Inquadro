import dynamic from 'next/dynamic';
import { ProductsDto } from '~&/src/shared/api/api.types';

const Page = dynamic(
    () =>
        import('~&/src/screens/product/product-page.ui').then(
            page => page.ProductPage
        ),
    { suspense: true }
);

export async function generateStaticParams() {
    const products = (await fetch('http://localhost:1010/api/product/all', {
        method: 'GET',
        next: { revalidate: 60 * 5 }
    }).then(res => res.json())) as ProductsDto;

    return products?.map(product => ({ slug: product.article }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
    return <Page slug={params.slug} />;
}
