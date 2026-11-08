'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconPlay, IconDownload } from './icons';
import { useLiquidPill } from './useLiquid';

const QUALITIES = [
  { id: '720', label: '720p HD' },
  { id: '1080', label: '1080p Full HD' },
];

// Episodes for ONE drama, with a liquid segmented switch for quality.
// The track is glass; a measured lime pill (blue in 1080p mode) springs
// between the two segments, and the episode grid below re-animates with a
// staggered fade/slide every time the quality changes. Watch buttons open
// the Watch page (player) in the selected quality; Download buttons use
// the episode's download link straight from the drama data.
export default function EpisodeSwitcher({ episodes, slug }) {
  const [quality, setQuality] = useState('720');
  const activeIndex = quality === '720' ? 0 : 1;
  const { containerRef, setItemRef, pillStyle, moving } = useLiquidPill(activeIndex);
  const is720 = quality === '720';

  return (
    <section className="section-block">
      <div className="ep-switch-row">
        <div
          className="ep-switch"
          role="tablist"
          aria-label="Video quality"
          ref={containerRef}
        >
          <span
            className={moving ? 'ep-switch-pill moving' : 'ep-switch-pill'}
            style={pillStyle}
            aria-hidden="true"
          >
            <span
              className={
                is720 ? 'ep-switch-pill-inner' : 'ep-switch-pill-inner fullhd'
              }
            />
          </span>
          {QUALITIES.map((q, i) => (
            <button
              key={q.id}
              ref={setItemRef(i)}
              type="button"
              role="tab"
              aria-selected={quality === q.id}
              className={quality === q.id ? 'ep-switch-btn active' : 'ep-switch-btn'}
              onClick={() => setQuality(q.id)}
            >
              {q.label}
            </button>
          ))}
        </div>
        <span className="detail-sub">
          {episodes.length} episode{episodes.length === 1 ? '' : 's'} available
        </span>
      </div>

      <div className="ep-grid" key={quality}>
        {episodes.map((ep, i) => (
          <div
            className="ep-card"
            key={`${quality}-${ep.number}`}
            style={{ animationDelay: `${Math.min(i, 14) * 35}ms` }}
          >
            <span className="ep-pill">EP {ep.number}</span>
            <div className="ep-links">
              <Link className="btn" href={`/watch/${slug}/${ep.number}?q=${quality}`}>
                <IconPlay size={13} /> Watch
              </Link>
              <a className="btn alt" href={is720 ? ep.download720 : ep.download1080}>
                <IconDownload size={13} /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="ep-note">
        Watch opens the player page. Stream links are placeholders in this
        demo — replace them in{' '}
        <code>lib/dramas.js</code> with links for content you have the rights
        to share.
      </p>
    </section>
  );
}
