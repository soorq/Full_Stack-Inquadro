import type { MetadataRoute } from 'next';

const $app = process.env['NEXT_PUBLIC_APP_URL'] as string;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/private',
                '/terms',
                '/personal',
                '/cookie',
                '/dashboard'
            ]
        },
        sitemap: $app + '/sitemap.xml'
    };
}
