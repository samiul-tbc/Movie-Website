'use client';

import { useRef } from 'react';
import Link from 'next/link';

export default function RowScroller({ title, href, children }) {
  const viewRef = useRef(null);

  const scroll = (dir) => {
    const el = viewRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="row-section">
      <div className="row-head">
        <h2 className="row-title">{title}</h2>
        {href && (
          <Link href={href} className="row-link">
            See All ›
          </Link>
        )}
        <div className="row-btns">
          <button type="button" className="row-btn" aria-label="Scroll left" onClick={() => scroll(-1)}>
            ‹
          </button>
          <button type="button" className="row-btn" aria-label="Scroll right" onClick={() => scroll(1)}>
            ›
          </button>
        </div>
      </div>
      <div className="row-viewport" ref={viewRef}>
        <div className="row-track">{children}</div>
      </div>
    </section>
  );
}
