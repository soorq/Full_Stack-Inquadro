import { getQueryClient } from '~&/src/shared/lib/query-client';
import { ProductQueries } from '~&/src/entities/product';
import dynamic from 'next/dynamic';

const Page = dynamic(
    () =>
        import('~&/src/screens/catalog/catalog-page.ui').then(
            page => page.CatalogPage
        ),
    { suspense: true }
);

export default function CatalogPage({ searchParams }: { searchParams: any }) {
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(
        ProductQueries.infinityProductsQuery({ filters: searchParams })
    );
    return <Page params={searchParams} />;
}
