import type { Metadata } from 'next';
import './globals.css';
import { RootProvider } from '~&/src/app/provider/index.provider';

export const metadata: Metadata = {
    title: 'Inquadra',
    description: ''
};

export default function RootLayout({
    children
}: Readonly<React.PropsWithChildren>) {
    return (
        <html lang="en" className="subpixel-antialiased">
            <body>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
