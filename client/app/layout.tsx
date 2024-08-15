import { RootProvider } from '~&/src/app/provider';
import type { Metadata } from 'next';
import './globals.css';

const $app = process.env['NEXT_PUBLIC_APP_URL'] as string;

export const metadata: Metadata = {
    title: {
        default: 'Inquadra',
        template: 'Inquadra | %s'
    },
    description: '',
    keywords: [''],
    alternates: {
        canonical: $app
    },
    referrer: 'strict-origin-when-cross-origin',
    openGraph: {
        title: '',
        description: '',
        url: new URL($app),
        type: 'website',
        siteName: 'Inquadro',
        locale: 'ru-RU',
        ttl: 60 * 5
    },
    twitter: {
        card: 'summary'
    }
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
