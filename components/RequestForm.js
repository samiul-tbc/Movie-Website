'use client';

import { useEffect, useState } from 'react';
import { IconSend, IconTrash, IconCheck } from './icons';
import { getRequests, addRequest, removeRequest } from '../lib/store';

const SITE_URL = 'https://hubcart-movie.vercel.app';

// Drama request form. On submit the request is saved on the device AND a
// Telegram share sheet opens with the request text pre-written, so the
// viewer can send it to the channel admins in two taps.
export default function RequestForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Korean Drama');
  const [language, setLanguage] = useState('Hindi Dubbed');
  const [note, setNote] = useState('');
  const [requests, setRequests] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const next = addRequest({ name: trimmed, type, language, note: note.trim() });
    setRequests(next);

    const text = [
      'New Drama Request — HubCart Movie',
      `Drama: ${trimmed}`,
      `Type: ${type}`,
      `Language: ${language}`,
      note.trim() ? `Note: ${note.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setName('');
    setNote('');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      <form className="admin-form request-form" onSubmit={onSubmit}>
        <label>
          Drama name *
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. the drama you are looking for"
            required
          />
        </label>
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Korean Drama</option>
            <option>Chinese Drama</option>
            <option>Anime</option>
            <option>Movie</option>
          </select>
        </label>
        <label>
          Language
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>Hindi Dubbed</option>
            <option>English Dubbed</option>
            <option>English Subtitle</option>
            <option>Any</option>
          </select>
        </label>
        <label>
          Note (optional)
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Season, year, or anything that helps us find it"
          />
        </label>
        <button type="submit" className="btn-watch request-submit">
          <IconSend size={17} /> Send Request via Telegram
        </button>
        {sent && (
          <p className="request-sent">
            <IconCheck size={15} /> Request saved — Telegram opened so you can send it.
          </p>
        )}
      </form>

      {requests.length > 0 && (
        <section className="section-block">
          <h2 className="section-title">Your recent requests</h2>
          <ul className="request-list">
            {requests.map((r) => (
              <li key={r.id} className="request-item">
                <div>
                  <strong>{r.name}</strong>
                  <span className="request-meta">
                    {r.type} · {r.language}
                    {r.note ? ` · ${r.note}` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  className="resume-x request-del"
                  aria-label={`Delete request for ${r.name}`}
                  onClick={() => {
                    removeRequest(r.id);
                    setRequests(getRequests());
                  }}
                >
                  <IconTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
