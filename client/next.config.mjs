/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    compress: true,
    experimental: {
        optimizePackageImports: [
            '@radix-ui/react-dialog',
            '@phosphor-icons',
            'swiper',
            'zod'
        ]
    },
    reactStrictMode: true,
    transpilePackages: ['@radix-ui/*'],
    images: {
        remotePatterns: [
            {
                hostname: 'inquadra.storage.yandexcloud.net',
                protocol: 'https',
                pathname: '**'
            }
        ]
    },

    webpack(cfg) {
        const fileLoaderRule = cfg.module.rules.find(rule =>
            rule.test?.test?.('.svg')
        );

        cfg.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/ // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/]
                }, // exclude if *.svg?url
                use: ['@svgr/webpack']
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return cfg;
    }
};

export default nextConfig;
