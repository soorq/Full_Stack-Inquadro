import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/favorite').then(page => page.FavoritePage)
);

export default function FavoritePage() {
    return <Page />;
}
