'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import RowScroller from './RowScroller';
import { IconPlay, IconX, IconClock } from './icons';
import { getProgress, removeProgress } from '../lib/store';
import { dramas } from '../lib/dramas';

// "Continue Watching" row on the homepage. Reads the device-local
// progress store; renders nothing until the viewer has opened at least
// one episode. Cards are landscape (backdrop) with a lime progress bar
// showing episode position inside the series.
export default function ContinueWatching() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const list = getProgress()
      .map((p) => {
        const drama = dramas.find((d) => d.slug === p.slug);
        return drama ? { ...p, drama } : null;
      })
      .filter(Boolean);
    setItems(list);
  }, []);

  if (!items.length) return null;

  return (
    <RowScroller
      title={
        <>
          <IconClock size={21} className="row-title-icon" /> Continue Watching
        </>
      }
    >
      {items.map(({ drama, ep, q }) => {
        const pct = Math.min(100, Math.round((ep / drama.totalEpisodes) * 100));
        return (
          <div className="resume-card" key={drama.slug}>
            <Link href={`/watch/${drama.slug}/${ep}?q=${q}`} className="resume-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={drama.poster} alt={drama.title} loading="lazy" />
              <span className="resume-shade" />
              <span className="resume-play">
                <IconPlay size={19} />
              </span>
              <span className="resume-ep">EP {ep}</span>
              <span className="resume-bar">
                <i style={{ width: `${pct}%` }} />
              </span>
            </Link>
            <button
              type="button"
              className="resume-x"
              aria-label={`Remove ${drama.title} from Continue Watching`}
              onClick={() => {
                removeProgress(drama.slug);
                setItems((prev) => prev.filter((i) => i.drama.slug !== drama.slug));
              }}
            >
              <IconX size={13} />
            </button>
            <p className="resume-title">{drama.title}</p>
            <p className="resume-sub">
              Episode {ep} of {drama.totalEpisodes} · {q}p
            </p>
          </div>
        );
      })}
    </RowScroller>
  );
}
