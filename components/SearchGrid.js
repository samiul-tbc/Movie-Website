'use client';

import { useMemo, useState } from 'react';
import DramaCard from './DramaCard';

export default function SearchGrid({ dramas, categories }) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [activeLang, setActiveLang] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dramas.filter((d) => {
      if (activeCat !== 'all' && d.category !== activeCat) return false;
      if (activeLang !== 'all' && !d.languages.toLowerCase().includes(activeLang)) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q) ||
        d.languages.toLowerCase().includes(q) ||
        d.genres.some((g) => g.toLowerCase().includes(q))
      );
    });
  }, [dramas, query, activeCat, activeLang]);

  return (
    <section>
      <div className="hero">
        <h1>Watch Korean, Chinese Dramas &amp; Anime — Hindi Dubbed</h1>
        <p>Search your favourite drama, pick an episode, choose 720p or 1080p.</p>
        <div className="searchbar">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drama name, genre, language…"
            aria-label="Search dramas"
          />
        </div>
      </div>

      <div className="chips">
        <button
          className={activeCat === 'all' ? 'chip active' : 'chip'}
          onClick={() => setActiveCat('all')}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            className={activeCat === c.slug ? 'chip active' : 'chip'}
            onClick={() => setActiveCat(c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="chips">
        {[
          ['all', 'All Languages'],
          ['hindi', 'Hindi Dubbed'],
          ['english dubbed', 'English Dubbed'],
          ['subtitle', 'Subtitle Only'],
        ].map(([value, label]) => (
          <button
            key={value}
            className={activeLang === value ? 'chip chip-sm active' : 'chip chip-sm'}
            onClick={() => setActiveLang(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No dramas found for “{query}”. Try another name or category.</p>
      ) : (
        <div className="grid">
          {filtered.map((d) => (
            <DramaCard key={d.slug} drama={d} />
          ))}
        </div>
      )}
    </section>
  );
}
