'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DramaCard from './DramaCard';
import { IconBookmark } from './icons';
import { getMyList } from '../lib/store';
import { dramas } from '../lib/dramas';

// My List page body (client): reads saved slugs from the local store and
// renders the normal poster grid. No account needed — stored on device.
export default function MyListPage() {
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    setSaved(getMyList());
  }, []);

  if (saved === null) return <p className="empty">Loading your list…</p>;

  const list = saved
    .map((slug) => dramas.find((d) => d.slug === slug))
    .filter(Boolean);

  if (!list.length) {
    return (
      <div className="list-empty">
        <span className="list-empty-icon">
          <IconBookmark size={34} />
        </span>
        <h2>Your list is empty</h2>
        <p>
          Tap the bookmark icon on any drama poster and it will wait for you
          here — no account needed.
        </p>
        <Link href="/search" className="btn-watch">
          Browse Dramas
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="detail-sub" style={{ marginBottom: 6 }}>
        {list.length} saved {list.length === 1 ? 'title' : 'titles'} on this device
      </p>
      <div className="grid">
        {list.map((d) => (
          <DramaCard key={d.slug} drama={d} />
        ))}
      </div>
    </>
  );
}
