import dynamic from 'next/dynamic';

const Page = dynamic(() =>
    import('~&/src/screens/cart').then(page => page.CartPage)
);

export default function CartPage() {
    return <Page />;
}
