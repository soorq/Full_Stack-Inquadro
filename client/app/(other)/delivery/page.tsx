import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/delievery').then(p => p.DelieveryPay)
);

export default function DelieveryPage() {
    return <Page />;
}
