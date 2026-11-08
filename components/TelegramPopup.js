'use client';

import { useEffect, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/Rdx_kdrama_hindi';

// Official Telegram paper-plane glyph (white plane, drawn inline as SVG).
function TelegramPlane({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9.04 15.31l-.38 4.24c.55 0 .79-.24 1.08-.53l2.6-2.48 5.38 3.94c.99.55 1.69.26 1.96-.91L22.9 4.6c.31-1.45-.52-2.02-1.48-1.66L2.4 10.6c-1.42.55-1.4 1.34-.24 1.7l4.86 1.52L18.3 6.36c.53-.35 1.01-.16.62.19L9.04 15.31z" />
    </svg>
  );
}

// Shows on EVERY full page load / refresh (per the site owner's spec).
// Dismissal is intentionally NOT persisted anywhere.
export default function TelegramPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div className="tg-popup-overlay" onClick={close}>
      <div
        className="tg-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tg-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="tg-popup-x"
          onClick={close}
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="tg-popup-logo" aria-hidden="true">
          <span className="tg-popup-logo-ring" />
          <span className="tg-popup-logo-circle">
            <TelegramPlane size={42} />
          </span>
        </div>

        <div className="tg-popup-badge">✓ OFFICIAL CHANNEL</div>

        <h2 id="tg-popup-title" className="tg-popup-title">
          Join Our <span className="tg-popup-title-accent">Telegram</span> Channel
        </h2>

        <p className="tg-popup-handle">@Rdx_kdrama_hindi</p>

        <p className="tg-popup-text">
          সবার আগে আপডেট পেতে আমাদের Telegram চ্যানেলে Join করুন — Get updates
          first, join our Telegram channel!
        </p>

        <div className="tg-popup-features" aria-hidden="true">
          <span>⚡ Instant updates</span>
          <span>🎬 New episodes first</span>
          <span>🆓 100% Free</span>
        </div>

        <div className="tg-popup-actions">
          <button type="button" className="tg-popup-close" onClick={close}>
            Close
          </button>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tg-popup-join"
            onClick={close}
          >
            <TelegramPlane size={17} />
            Join Now
          </a>
        </div>
      </div>
    </div>
  );
}
