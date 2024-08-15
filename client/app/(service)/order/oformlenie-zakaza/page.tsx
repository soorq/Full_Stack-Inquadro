import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/order').then(p => p.OrderMakingPage)
);

export default function OrderPage() {
    return <Page />;
}
