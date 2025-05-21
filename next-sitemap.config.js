/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://apexfeed.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/api/*',
    '/private/*',
    '/admin/*',
    '/dashboard/*',
    '/_next/*',
    '/static/*',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      // Add any additional sitemaps here if needed
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/private/*',
          '/admin/*',
          '/dashboard/*',
          '/_next/*',
          '/static/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/*',
          '/private/*',
          '/admin/*',
          '/dashboard/*',
        ],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom transform function to modify sitemap entries
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
} 