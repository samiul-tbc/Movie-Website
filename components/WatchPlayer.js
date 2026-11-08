'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  IconPlay,
  IconDownload,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconHome,
  IconSend,
} from './icons';
import { useLiquidPill } from './useLiquid';
import { saveProgress } from '../lib/store';
import { formatViews } from './DramaCard';

const QUALITIES = [
  { id: '720', label: '720p HD' },
  { id: '1080', label: '1080p Full HD' },
];

function youtubeId(url) {
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  return m ? m[1] : null;
}

// Resolve an episode link into something playable:
//  - YouTube watch/embed/shorts link -> YouTube embed player
//  - direct .mp4/.webm/.m3u8 file    -> native <video>
//  - any other http(s) link          -> iframe embed (file-host embed pages)
//  - '#' or empty                     -> designed placeholder
function resolveSource(raw) {
  if (!raw || raw === '#') return { kind: 'placeholder' };
  const id = youtubeId(raw);
  if (id) return { kind: 'embed', src: `https://www.youtube.com/embed/${id}?rel=0` };
  if (/\.(mp4|webm|m3u8)(\?|#|$)/i.test(raw)) return { kind: 'video', src: raw };
  return { kind: 'embed', src: raw };
}

export default function WatchPlayer({ drama, ep, initialQuality }) {
  const total = drama.episodes.length;
  const episode = drama.episodes.find((e) => e.number === ep) || drama.episodes[0];
  const epNum = episode.number;

  const [quality, setQuality] = useState(initialQuality === '1080' ? '1080' : '720');
  const [expanded, setExpanded] = useState(false);
  const activeIndex = quality === '720' ? 0 : 1;
  const { containerRef, setItemRef, pillStyle, moving } = useLiquidPill(activeIndex);
  const is720 = quality === '720';

  const raw = is720 ? episode.watch720 : episode.watch1080;
  const download = is720 ? episode.download720 : episode.download1080;
  const source = resolveSource(raw);

  // Remember where the viewer stopped (Continue Watching row on home).
  useEffect(() => {
    saveProgress({ slug: drama.slug, ep: epNum, q: quality });
  }, [drama.slug, epNum, quality]);

  const switchQuality = (q) => {
    setQuality(q);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('q', q);
      window.history.replaceState(null, '', url);
    } catch {
      // ignore
    }
  };

  const watchHref = (n) => `/watch/${drama.slug}/${n}?q=${quality}`;
  const backdrop = drama.poster.replace('/640/360', '/1280/720');

  return (
    <div className="watch-shell">
      {/* Breadcrumb + views */}
      <nav className="watch-crumbs" aria-label="Breadcrumb">
        <Link href="/">
          <IconHome size={15} /> Home
        </Link>
        <span className="crumb-sep">›</span>
        <Link href={`/category/${drama.category}`}>{drama.type}</Link>
        <span className="crumb-sep">›</span>
        <Link href={`/drama/${drama.slug}`} className="crumb-title">
          {drama.title}
        </Link>
        <span className="crumb-sep">›</span>
        <span className="crumb-ep">EP {epNum}</span>
        <span className="crumb-views">
          <IconEye size={15} /> {formatViews(drama.views)}
        </span>
      </nav>

      {/* Player */}
      <div className="player-frame">
        {source.kind === 'embed' && (
          <iframe
            key={source.src}
            src={source.src}
            title={`${drama.title} — Episode ${epNum}`}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="origin"
          />
        )}
        {source.kind === 'video' && (
          <video key={source.src} src={source.src} controls playsInline preload="metadata" />
        )}
        {source.kind === 'placeholder' && (
          <div
            className="player-ph"
            style={{ backgroundImage: `url(${backdrop})` }}
            role="img"
            aria-label="Video placeholder"
          >
            <div className="player-ph-shade" />
            <span className="player-ph-play">
              <IconPlay size={30} />
            </span>
            <p className="player-ph-title">Episode {epNum} video coming soon</p>
            <p className="player-ph-sub">
              The {is720 ? '720p' : '1080p'} stream link for this episode has not
              been added yet. New episodes are announced first on Telegram.
            </p>
            <a
              href="https://t.me/Rdx_kdrama_hindi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <IconSend size={14} /> Get Updates
            </a>
          </div>
        )}
      </div>

      {/* Title + storyline (expandable) + download */}
      <div className="watch-title-row">
        <div className="watch-title-main">
          <h1 className="watch-title">
            {drama.title} <span className="watch-title-ep">— Episode {epNum}</span>
          </h1>
          <p className={`watch-story ${expanded ? 'open' : ''}`}>{drama.storyline}</p>
          <button
            type="button"
            className="watch-more"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? '...less' : '...more'}
          </button>
        </div>
        <a
          className="btn-watch watch-download"
          href={download && download !== '#' ? download : '#'}
          {...(download && download !== '#'
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          <IconDownload size={17} /> Download
        </a>
      </div>

      {/* Quality liquid switch */}
      <div className="ep-switch-row watch-quality-row">
        <div className="ep-switch" role="tablist" aria-label="Video quality" ref={containerRef}>
          <span
            className={moving ? 'ep-switch-pill moving' : 'ep-switch-pill'}
            style={pillStyle}
            aria-hidden="true"
          >
            <span className={is720 ? 'ep-switch-pill-inner' : 'ep-switch-pill-inner fullhd'} />
          </span>
          {QUALITIES.map((q, i) => (
            <button
              key={q.id}
              ref={setItemRef(i)}
              type="button"
              role="tab"
              aria-selected={quality === q.id}
              className={quality === q.id ? 'ep-switch-btn active' : 'ep-switch-btn'}
              onClick={() => switchQuality(q.id)}
            >
              {q.label}
            </button>
          ))}
        </div>
        <span className="detail-sub">
          {drama.languages} · {drama.runningTime} · {drama.country}
        </span>
      </div>

      {/* Prev / position / Next */}
      <div className="watch-nav">
        {epNum > 1 ? (
          <Link className="watch-nav-btn" href={watchHref(epNum - 1)}>
            <IconChevronLeft size={16} /> Prev Episode
          </Link>
        ) : (
          <span className="watch-nav-btn disabled">
            <IconChevronLeft size={16} /> Prev Episode
          </span>
        )}
        <span className="watch-pos">
          Episode {epNum} of {total}
        </span>
        {epNum < total ? (
          <Link className="watch-nav-btn" href={watchHref(epNum + 1)}>
            Next Episode <IconChevronRight size={16} />
          </Link>
        ) : (
          <span className="watch-nav-btn disabled">
            Next Episode <IconChevronRight size={16} />
          </span>
        )}
      </div>

      {/* Episode chip rail */}
      <div className="ep-rail" role="navigation" aria-label="Episodes">
        {drama.episodes.map((e) =>
          e.number === epNum ? (
            <span key={e.number} className="ep-chip active" aria-current="true">
              EP {e.number}
              <span className="eq" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </span>
          ) : (
            <Link key={e.number} className="ep-chip" href={watchHref(e.number)}>
              EP {e.number}
              <IconPlay size={11} className="ep-chip-play" />
            </Link>
          )
        )}
      </div>
    </div>
  );
}
