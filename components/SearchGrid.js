'use client';

import { useMemo, useState } from 'react';
import DramaCard from './DramaCard';
import { useLiquidPill } from './useLiquid';

// One row of filter chips with the liquid-glass treatment: a measured pill
// slides behind the active chip (spring transition + stretch), the chips
// themselves are transparent buttons sitting above it.
function ChipRow({ options, value, onChange, small = false }) {
  const activeIndex = options.findIndex((o) => o.value === value);
  const { containerRef, setItemRef, pillStyle, moving } = useLiquidPill(activeIndex);

  return (
    <div className="chips liquid-chips" ref={containerRef}>
      <span
        className={moving ? 'chip-pill moving' : 'chip-pill'}
        style={pillStyle}
        aria-hidden="true"
      >
        <span className="chip-pill-inner" />
      </span>
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={setItemRef(i)}
          className={
            (small ? 'chip chip-sm' : 'chip') +
            (o.value === value ? ' active' : '')
          }
          onClick={() => onChange(o.value)}
          aria-pressed={o.value === value}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function SearchGrid({ dramas, categories, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
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
        (d.subtitle || '').toLowerCase().includes(q) ||
        (d.storyline || '').toLowerCase().includes(q) ||
        d.genres.some((g) => g.toLowerCase().includes(q))
      );
    });
  }, [dramas, query, activeCat, activeLang]);

  const catOptions = [
    { value: 'all', label: 'All' },
    ...categories.map((c) => ({ value: c.slug, label: c.name })),
  ];
  const langOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'hindi', label: 'Hindi Dubbed' },
    { value: 'english dubbed', label: 'English Dubbed' },
    { value: 'subtitle', label: 'Subtitle Only' },
  ];

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

      <ChipRow options={catOptions} value={activeCat} onChange={setActiveCat} />
      <ChipRow
        options={langOptions}
        value={activeLang}
        onChange={setActiveLang}
        small
      />

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
