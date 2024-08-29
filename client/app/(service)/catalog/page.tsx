import { TypeQueryFilters } from '~&/src/features/filter';
import dynamic from 'next/dynamic';

const Page = dynamic(
    () => import('~&/src/screens/catalog').then(page => page.CatalogPage),
    { suspense: true }
);

export default function CatalogPage({
    searchParams
}: {
    searchParams: TypeQueryFilters;
}) {
    return <Page params={searchParams} />;
}
