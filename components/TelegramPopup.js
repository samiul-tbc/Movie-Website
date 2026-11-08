'use client';

import { useEffect, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/Rdx_kdrama_hindi';

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
  }, [open ]);

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

        <div className="tg-popup-icon" aria-hidden="true">✈️</div>

        <h2 id="tg-popup-title" className="tg-popup-title">
          Join Our Telegram Channel
        </h2>

        <p className="tg-popup-text">
          সবার আগে আপডেট পেতে আমাদের Telegram চ্যানেলে Join করুন — Get updates
          first, join our Telegram channel!
        </p>

        <div className="tg-popup-actions">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tg-popup-join"
            onClick={close}
          >
            Join Now
          </a>
          <button type="button" className="tg-popup-close" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
