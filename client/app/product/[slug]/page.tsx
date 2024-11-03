import { getProductBySlug, getProducts } from './action';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/product/product-page.ui').then(
        page => page.ProductPage
    )
);

export async function generateMetadata({
    params
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);

    return {
        title: product.data.name,
        description: `Купите ${product.data.name} — высококачественную ${product.data.category}, идеально подходящую для ${product.data.usage}. Эта плитка доступна ${product.data.availability} состоянии и стоит ${product.data.price} за единицу. Производство: ${product.data.country}. Идеально подходит для создания стильных интерьеров и долговечного покрытия.`,
        openGraph: {
            title: `Inquadro | ${product.data.name}`,
            description: `Купите ${product.data.name} — высококачественную ${product.data.category}, идеально подходящую для ${product.data.usage}. Эта плитка доступна ${product.data.availability} состоянии и стоит ${product.data.price} за единицу. Производство: ${product.data.country}. Идеально подходит для создания стильных интерьеров и долговечного покрытия.`
        },
        authors: {
            name: 'Danil or Soorq'
        },
        alternates: {
            /*
             * FIXME : CANNONICAL LINKS
             */
            canonical: new URL('http://localhost:3000')
        }
    };
}

export async function generateStaticParams() {
    const products = await getProducts();

    return products?.data.map(product => ({ slug: product.slug }));
}

export default async function ProductPage({
    params
}: {
    params: { slug: string };
}) {
    const product = await getProductBySlug(params.slug).catch(() => notFound());

    return <Page product={product.data} slug={params.slug} />;
}
