import { MetadataRoute } from 'next';

const $app = process.env['NEXT_PUBLIC_APP_URL'] as string;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: $app + '/',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1
        },
        {
            url: $app + '/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
        },
        {
            url: $app + '/catalog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5
        }
    ];
}
