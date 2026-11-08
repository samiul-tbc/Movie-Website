'use client';

import { useMemo, useState } from 'react';
import { IconCheck } from './icons';

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function AdminForm() {
  const [form, setForm] = useState({
    title: 'My New Drama',
    type: 'Korean Drama',
    category: 'korean',
    languages: 'Hindi Dubbed',
    subtitle: 'English',
    season: 1,
    totalEpisodes: 12,
    addedEpisodes: 1,
    runningTime: '60 minute',
    genres: 'Romance, Drama',
    releaseDate: '1 January 2026',
    country: 'South Korea',
    maxFileSize: '500MB / 1.5GB',
    storyline: 'Write one short, original paragraph describing this drama.',
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const snippet = useMemo(() => {
    const slug = slugify(form.title) || 'new-drama';
    const genres = form.genres.split(',').map((g) => g.trim()).filter(Boolean);
    return `  entry({
    slug: '${slug}',
    title: '${form.title.replace(/'/g, "\\'")}',
    type: '${form.type}',
    category: '${form.category}',
    languages: '${form.languages}',
    subtitle: '${form.subtitle}',
    season: ${Number(form.season) || 1},
    totalEpisodes: ${Number(form.totalEpisodes) || 1},
    addedEpisodes: ${Number(form.addedEpisodes) || 1},
    runningTime: '${form.runningTime}',
    genres: [${genres.map((g) => `'${g}'`).join(', ')}],
    releaseDate: '${form.releaseDate}',
    country: '${form.country}',
    maxFileSize: '${form.maxFileSize}',
    storyline:
      '${String(form.storyline).replace(/'/g, "\\'")}',
  }),`;
  }, [form]);

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const text = (label, key, type = 'text') => (
    <label>
      {label}
      <input type={type} value={form[key]} onChange={set(key)} />
    </label>
  );

  return (
    <div>
      <div className="admin-form">
        {text('Title', 'title')}
        <label>
          Type
          <select value={form.type} onChange={set('type')}>
            <option>Korean Drama</option>
            <option>Chinese Drama</option>
            <option>Anime</option>
            <option>Korean Movie</option>
          </select>
        </label>
        <label>
          Category
          <select value={form.category} onChange={set('category')}>
            <option value="korean">korean</option>
            <option value="chinese">chinese</option>
            <option value="anime">anime</option>
            <option value="movies">movies</option>
          </select>
        </label>
        {text('Languages', 'languages')}
        {text('Subtitle', 'subtitle')}
        {text('Season', 'season', 'number')}
        {text('Total Episodes', 'totalEpisodes', 'number')}
        {text('Added Episodes', 'addedEpisodes', 'number')}
        {text('Running Time', 'runningTime')}
        {text('Genres (comma separated)', 'genres')}
        {text('Release Date', 'releaseDate')}
        {text('Country', 'country')}
        {text('Maximum File Size', 'maxFileSize')}
        <label>
          Storyline (your own words)
          <textarea rows={4} value={form.storyline} onChange={set('storyline')} />
        </label>
      </div>

      <h2 className="section-title" style={{ textAlign: 'left', marginTop: 24 }}>
        Generated snippet — paste into the <code>dramas</code> list in <code>lib/dramas.js</code>
      </h2>
      <textarea className="admin-out" readOnly value={snippet} />
      <button className="btn" onClick={copy} style={{ marginTop: 10, cursor: 'pointer', border: 'none' }}>
        {copied ? <><IconCheck size={14} /> Copied</> : 'Copy snippet'}
      </button>
      <p className="card-meta" style={{ marginTop: 12 }}>
        After pasting, also update the episode watch/download links for that drama
        in <code>lib/dramas.js</code> (they start as <code>#</code> placeholders).
      </p>
    </div>
  );
}
