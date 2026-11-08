// Static sitemap: home, search, categories + one entry per drama.
import { dramas, categories } from '../lib/dramas';

const SITE_URL = 'https://hubcart-movie.vercel.app';

export default function sitemap() {
  const now = new Date();
  const routes = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/search`, lastModified: now },
    { url: `${SITE_URL}/my-list`, lastModified: now },
    { url: `${SITE_URL}/request`, lastModified: now },
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
