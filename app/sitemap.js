// Static sitemap: home, search, categories + one entry per drama.
// Change SITE_URL once a real domain is connected.
import { dramas, categories } from '../lib/dramas';

const SITE_URL = 'https://dramahub.vercel.app';

export default function sitemap() {
  const now = new Date();
  const routes = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/search`, lastModified: now },
    ...categories.map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      lastModified: now,
    })),
    ...dramas.map((d) => ({
      url: `${SITE_URL}/drama/${d.slug}`,
      lastModified: now,
    })),
  ];
  return routes;
}
