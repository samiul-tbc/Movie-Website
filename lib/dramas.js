// Sample catalog data for HubCart Movie v1.
// All titles, storylines and images below are ORIGINAL PLACEHOLDERS for
// development only. Replace them with your own licensed / permitted content.
// Episode watch/download links are '#' placeholders — put real links only
// for content you have the rights to distribute.
//
// How to add a drama: copy one object, change the fields, keep `slug` unique.

function eps(count) {
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    watch720: '#',
    download720: '#',
    watch1080: '#',
    download1080: '#',
  }));
}

function entry({
  slug, title, type, category, languages, subtitle, season = 1,
  totalEpisodes, addedEpisodes, runningTime, genres, releaseDate,
  country, quality = '720p / 1080p HD', maxFileSize, storyline,
  rating, featured = false, views = 0,
}) {
  return {
    slug,
    title,
    type,
    category,
    languages,
    subtitle,
    season,
    totalEpisodes,
    addedEpisodes,
    runningTime,
    genres,
    releaseDate,
    country,
    quality,
    maxFileSize,
    storyline,
    rating,
    featured,
    views,
    poster: `https://picsum.photos/seed/${slug}/640/360`,
    screenshots: [1, 2, 3].map(
      (n) => `https://picsum.photos/seed/${slug}-shot${n}/640/360`
    ),
    episodes: eps(addedEpisodes),
  };
}

export const categories = [
  { slug: 'korean', name: 'Korean Drama', type: 'Korean Drama' },
  { slug: 'chinese', name: 'Chinese Drama', type: 'Chinese Drama' },
  { slug: 'anime', name: 'Anime', type: 'Anime' },
  { slug: 'movies', name: 'Movies', type: 'Korean Movie' },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export const dramas = [
  entry({
    slug: 'sample-seoul-neighbours',
    title: 'Sample Seoul Neighbours',
    type: 'Korean Drama',
    category: 'korean',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    totalEpisodes: 12,
    addedEpisodes: 4,
    runningTime: '60 minute',
    genres: ['Romance', 'Comedy'],
    releaseDate: '10 January 2026',
    country: 'South Korea',
    maxFileSize: '500MB / 1.5GB',
    rating: 8.4,
    views: 4200,
    featured: true,
    storyline:
      'Two neighbours in a small Seoul apartment building keep crossing paths at the worst possible moments. A friendly rivalry over parking, parcels and a shared rooftop slowly turns into something warmer in this light, original sample storyline written only as placeholder text for the website demo.',
  }),
  entry({
    slug: 'sample-midnight-clinic',
    title: 'Sample Midnight Clinic',
    type: 'Korean Drama',
    category: 'korean',
    languages: 'Hindi, English Dubbed',
    subtitle: 'English - Arabic',
    totalEpisodes: 16,
    addedEpisodes: 6,
    runningTime: '65 minute',
    genres: ['Thriller', 'Mystery', 'Drama'],
    releaseDate: '22 February 2026',
    country: 'South Korea',
    maxFileSize: '450MB / 2.1GB',
    rating: 9.2,
    views: 9150,
    featured: true,
    storyline:
      'A night-shift doctor at a quiet clinic notices that several patients share one strange detail in their records. With the help of a junior nurse she starts asking questions nobody wants answered. This is an original placeholder synopsis created for demo purposes only.',
  }),
  entry({
    slug: 'sample-river-palace-tale',
    title: 'Sample River Palace Tale',
    type: 'Chinese Drama',
    category: 'chinese',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    totalEpisodes: 24,
    addedEpisodes: 8,
    runningTime: '45 minute',
    genres: ['Historical', 'Romance'],
    releaseDate: '5 March 2026',
    country: 'China',
    maxFileSize: '400MB / 1.8GB',
    rating: 8.7,
    views: 6800,
    storyline:
      'A young river-port clerk is sent to deliver a sealed letter to a palace official and accidentally becomes the keeper of a family secret. Costumes, courtesy and quiet humour carry this original sample story, written purely as placeholder copy for the catalog layout.',
  }),
  entry({
    slug: 'sample-paper-moon-cafe',
    title: 'Sample Paper Moon Cafe',
    type: 'Chinese Drama',
    category: 'chinese',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    totalEpisodes: 20,
    addedEpisodes: 20,
    runningTime: '40 minute',
    genres: ['Romance', 'Slice of Life'],
    releaseDate: '18 April 2026',
    country: 'China',
    maxFileSize: '350MB / 1.2GB',
    rating: 8.1,
    views: 8600,
    storyline:
      'The owner of a tiny cafe that only opens on rainy days keeps a notebook of wishes left by customers. When an old friend returns to town, two unfinished wishes finally get their chance. An original, gentle placeholder storyline for demonstration only.',
  }),
  entry({
    slug: 'sample-starlight-academy',
    title: 'Sample Starlight Academy',
    type: 'Anime',
    category: 'anime',
    languages: 'Hindi, English Dubbed',
    subtitle: 'English',
    totalEpisodes: 13,
    addedEpisodes: 5,
    runningTime: '24 minute',
    genres: ['Animation', 'Fantasy', 'School'],
    releaseDate: '9 January 2026',
    country: 'Japan',
    maxFileSize: '200MB / 800MB',
    rating: 8.9,
    views: 5400,
    featured: true,
    storyline:
      'At an academy where students chart magical star maps, a first-year who cannot read the sky at all teams up with the top student for the winter festival contest. A cheerful original placeholder synopsis invented for this sample catalog entry.',
  }),
  entry({
    slug: 'sample-mecha-harbor',
    title: 'Sample Mecha Harbor',
    type: 'Anime',
    category: 'anime',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    totalEpisodes: 26,
    addedEpisodes: 10,
    runningTime: '24 minute',
    genres: ['Animation', 'Action', 'Sci-Fi'],
    releaseDate: '14 February 2026',
    country: 'Japan',
    maxFileSize: '250MB / 1GB',
    rating: 8.6,
    views: 3950,
    storyline:
      'Dock workers in a futuristic harbour city maintain giant rescue robots. When a storm knocks out the harbour beacon, a young mechanic gets her first real mission. This action-packed synopsis is original placeholder text and does not describe any real series.',
  }),
  entry({
    slug: 'sample-last-train-home',
    title: 'Sample Last Train Home',
    type: 'Korean Movie',
    category: 'movies',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    season: 1,
    totalEpisodes: 1,
    addedEpisodes: 1,
    runningTime: '118 minute',
    genres: ['Drama', 'Family'],
    releaseDate: '30 May 2026',
    country: 'South Korea',
    maxFileSize: '700MB / 2.9GB',
    rating: 9.4,
    views: 7300,
    featured: true,
    storyline:
      'Estranged siblings meet by chance on the last train of the night and have one long ride to decide what to do with their childhood home. A quiet, original sample movie synopsis written only to demonstrate the movie page layout.',
  }),
  entry({
    slug: 'sample-island-lighthouse',
    title: 'Sample Island Lighthouse',
    type: 'Korean Movie',
    category: 'movies',
    languages: 'English Dubbed',
    subtitle: 'English - Arabic',
    totalEpisodes: 1,
    addedEpisodes: 1,
    runningTime: '104 minute',
    genres: ['Mystery', 'Drama'],
    releaseDate: '12 June 2026',
    country: 'South Korea',
    maxFileSize: '650MB / 2.4GB',
    rating: 8.3,
    views: 1980,
    storyline:
      'A lighthouse keeper on a remote island logs a light signal from a boat that sank years ago, and a visiting journalist tries to help him prove it. Original placeholder copy for demo purposes — not the story of any real film.',
  }),
  entry({
    slug: 'sample-campus-detectives',
    title: 'Sample Campus Detectives',
    type: 'Korean Drama',
    category: 'korean',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    totalEpisodes: 12,
    addedEpisodes: 12,
    runningTime: '55 minute',
    genres: ['Mystery', 'Comedy', 'Youth'],
    releaseDate: '7 July 2026',
    country: 'South Korea',
    maxFileSize: '480MB / 1.9GB',
    rating: 7.8,
    views: 2650,
    storyline:
      'Three classmates start an unofficial lost-and-found club and keep stumbling into bigger campus mysteries than missing umbrellas. Light, funny and entirely invented, this placeholder storyline exists only to fill the demo catalog.',
  }),
  entry({
    slug: 'sample-garden-of-letters',
    title: 'Sample Garden of Letters',
    type: 'Chinese Drama',
    category: 'chinese',
    languages: 'English Subtitle',
    subtitle: 'English',
    totalEpisodes: 30,
    addedEpisodes: 3,
    runningTime: '45 minute',
    genres: ['Romance', 'Family'],
    releaseDate: '21 August 2026',
    country: 'China',
    maxFileSize: '420MB / 1.7GB',
    rating: 8.0,
    views: 145,
    storyline:
      'A botanist restoring an old family garden finds bundles of unsent letters hidden in the greenhouse and decides to deliver them, decades late. An original sample synopsis created for this placeholder entry.',
  }),
];

// DEMO EMBED — one openly-licensed sample video (Big Buck Bunny by the
// Blender Foundation, CC-BY) wired into Sample Midnight Clinic EP 1 so the
// Watch page player UI can be previewed end-to-end. Replace this link with
// your own embed/file links for content you have the rights to share.
const DEMO_VIDEO_URL = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
const demoDrama = dramas.find((d) => d.slug === 'sample-midnight-clinic');
if (demoDrama && demoDrama.episodes[0]) {
  demoDrama.episodes[0].watch720 = DEMO_VIDEO_URL;
  demoDrama.episodes[0].watch1080 = DEMO_VIDEO_URL;
}

export function getDrama(slug) {
  return dramas.find((d) => d.slug === slug) || null;
}

export function getDramasByCategory(categorySlug) {
  return dramas.filter((d) => d.category === categorySlug);
}

// Card / page heading in the reference site's pattern:
// "Title (Type) Language [ Episode X ADD ]"
export function cardTitle(drama) {
  if (drama.type === 'Korean Movie' || drama.totalEpisodes === 1) {
    return `${drama.title} (${drama.type}) ${drama.languages}`;
  }
  if (drama.addedEpisodes >= drama.totalEpisodes) {
    return `${drama.title} (${drama.type}) ${drama.languages} [ All Episodes ADD ]`;
  }
  return `${drama.title} (${drama.type}) ${drama.languages} [ Episode ${drama.addedEpisodes} ADD ]`;
}
