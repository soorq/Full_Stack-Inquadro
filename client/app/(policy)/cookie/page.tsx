import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/policy').then(p => p.CookiePage)
);

export default function CookiePage() {
    return <Page />;
}
