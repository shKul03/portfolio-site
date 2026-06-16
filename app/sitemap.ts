import type { MetadataRoute } from 'next';

const baseUrl = 'https://shlokakulkarni.vercel.app';

const projectSlugs = [
  'livemind',
  'knowledge-engine',
  'onboardiq',
  'senticore',
  'smart-revenue-collector',
  'voicebot',
  'billsage',
  'technossus-design-system',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bot-context`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
