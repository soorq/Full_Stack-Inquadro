import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/policy').then(p => p.PersonalPage)
);

export default function PersonalPage() {
    return <Page />;
}
