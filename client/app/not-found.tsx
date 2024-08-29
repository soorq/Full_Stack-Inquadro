import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/404').then(p => p.NotFoundPage)
);

export default function NotFound() {
    return <Page />;
}
