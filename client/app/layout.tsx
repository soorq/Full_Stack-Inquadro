import { Manrope } from 'next/font/google';
import { RootProvider } from '~&/src/app/provider';
import type { Metadata } from 'next';
import './globals.css';

const font = Manrope({
    weight: ['400', '500', '300'],
    adjustFontFallback: false,
    variable: '--font-man',
    subsets: ['latin'],
    preload: true
});

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
        <html lang="ru" className="antialiased scroll-m-12">
            <body className={font.variable}>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
