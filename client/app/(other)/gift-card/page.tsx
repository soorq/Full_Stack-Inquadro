import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/gift-card').then(p => p.GiftCard)
);

export default function GiftcardPage() {
    return <Page />;
}
