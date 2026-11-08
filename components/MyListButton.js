'use client';

import { useEffect, useState } from 'react';
import { IconBookmark, IconCheck } from './icons';
import { isInMyList, toggleMyList } from '../lib/store';

// Bookmark toggle for My List. Two variants:
//  - "card" (default): round glass button floating on the poster
//  - "labelled": pill button with text, used on the drama detail hero
// Clicks are stopped so card links underneath do not navigate.
export default function MyListButton({ slug, variant = 'card', className = '' }) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSaved(isInMyList(slug));
    setMounted(true);
  }, [slug]);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleMyList(slug));
  };

  if (variant === 'labelled') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`mylist-btn-label ${saved ? 'saved' : ''} ${className}`}
        aria-pressed={saved}
      >
        {saved ? <IconCheck size={17} /> : <IconBookmark size={17} />}
        {saved ? 'In My List' : 'My List'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mylist-btn ${saved ? 'saved' : ''} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from My List' : 'Add to My List'}
      title={saved ? 'In My List' : 'Add to My List'}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      <IconBookmark size={18} filled={saved} />
    </button>
  );
}
