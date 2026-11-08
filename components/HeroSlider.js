'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { portraitUrl } from './DramaCard';
import {
  IconPlay,
  IconStar,
  IconInfo,
  IconSparkles,
  IconChevronLeft,
  IconChevronRight,
} from './icons';

function backdropUrl(drama) {
  return drama.poster.replace('/640/360', '/1280/720');
}

function yearOf(drama) {
  const parts = String(drama.releaseDate).trim().split(' ');
  return parts[parts.length - 1];
}

export default function HeroSlider({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const timer = useRef(null);

  const go = useCallback(
    (i) => setIndex(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(timer.current);
  }, [paused, count]);

  if (!count) return null;

  return (
    <section
      className="hero-slider"
      aria-label="Featured dramas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((d, i) => (
        <article
          key={d.slug}
          className={i === index ? 'hero-slide active' : 'hero-slide'}
          aria-hidden={i !== index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-slide-bg" src={backdropUrl(d)} alt="" />
          <div className="hero-shade" />
          <div className="hero-poster" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portraitUrl(d)} alt="" loading="lazy" />
          </div>
          <div className="hero-content">
            <div className="hero-badges hero-anim">
              <span className="hbadge lime"><IconSparkles size={13} /> Featured</span>
              <span className="hbadge">{d.quality}</span>
              <span className="hbadge blue">{d.languages}</span>
              <span className="hbadge">
                {d.totalEpisodes === 1 ? 'Full Movie' : `EP ${d.addedEpisodes} ADD`}
              </span>
            </div>
            <h2 className="hero-title hero-anim d1">{d.title}</h2>
            <div className="hero-meta hero-anim d2">
              <span className="star"><IconStar size={15} /> {d.rating?.toFixed(1)}</span>
              <span>{yearOf(d)}</span>
              <span className="dot-sep">•</span>
              <span>{d.type}</span>
              <span className="dot-sep">•</span>
              <span>
                {d.addedEpisodes}/{d.totalEpisodes} Episodes
              </span>
              <span className="dot-sep">•</span>
              <span>{d.genres.join(' · ')}</span>
            </div>
            <p className="hero-story hero-anim d3">{d.storyline}</p>
            <div className="hero-actions hero-anim d4">
              <Link href={`/drama/${d.slug}`} className="btn-watch">
                <IconPlay size={17} /> Watch Now
              </Link>
              <Link href={`/drama/${d.slug}`} className="btn-info">
                <IconInfo size={18} /> Details
              </Link>
            </div>
          </div>
        </article>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            className="hero-arrow prev"
            aria-label="Previous featured"
            onClick={() => go(index - 1)}
          >
            <IconChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="hero-arrow next"
            aria-label="Next featured"
            onClick={() => go(index + 1)}
          >
            <IconChevronRight size={22} />
          </button>
          <div className="hero-dots">
            {items.map((d, i) => (
              <button
                key={d.slug}
                type="button"
                className={i === index ? 'hero-dot active' : 'hero-dot'}
                aria-label={`Show ${d.title}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
