import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/order').then(p => p.OrderConfirmPage)
);

export default function PreOrderPage() {
    return <Page />;
}
