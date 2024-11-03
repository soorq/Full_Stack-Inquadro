import type { filterT } from '~&/src/shared/api/filter';
import dynamic from 'next/dynamic';

const Page = dynamic(
    () => import('~&/src/screens/catalog').then(page => page.CatalogPage),
    { suspense: true }
);

export default function CatalogPage({
    searchParams
}: {
    searchParams: filterT.TypeQueryFilters;
}) {
    return <Page params={searchParams} />;
}
