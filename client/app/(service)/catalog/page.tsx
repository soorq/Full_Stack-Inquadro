import dynamic from 'next/dynamic';

const Page = dynamic(
    () =>
        import('~&/src/screens/catalog/catalog-page.ui').then(
            page => page.CatalogPage
        ),
    { suspense: true }
);

export default function CatalogPage() {
    return <Page />;
}
