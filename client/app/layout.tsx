import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Inquadra',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<React.PropsWithChildren>) {
    return (
        <html lang="en" className="subpixel-antialiased">
            <body>{children}</body>
        </html>
    );
}
