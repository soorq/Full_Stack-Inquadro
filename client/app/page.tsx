import dynamic from 'next/dynamic';

const RootPage = dynamic(() =>
    import('~&/src/screens/root').then(page => page.RootPageUi)
);

export default function Home() {
    return <RootPage />;
}
