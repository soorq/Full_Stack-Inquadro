import dynamic from 'next/dynamic';
import { TypeQueryFilters } from '~&/src/entities/filter/filter.types';

const Page = dynamic(
    () =>
        import('~&/src/screens/catalog/catalog-page.ui').then(
            page => page.CatalogPage
        ),
    { suspense: true }
);

export default function CatalogPage({
    searchParams
}: {
    searchParams: TypeQueryFilters;
}) {
    return <Page params={searchParams} />;
}
