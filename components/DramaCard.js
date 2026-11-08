import Link from 'next/link';
import { cardTitle } from '../lib/dramas';

export function portraitUrl(drama) {
  return drama.poster.replace('/640/360', '/500/750');
}

export function formatViews(v) {
  if (!v && v !== 0) return '0';
  if (v >= 1000) {
    const k = (v / 1000).toFixed(1).replace(/\.0$/, '');
    return `${k}k`;
  }
  return String(v);
}

export default function DramaCard({ drama }) {
  const epBadge =
    drama.totalEpisodes === 1
      ? 'MOVIE'
      : drama.addedEpisodes >= drama.totalEpisodes
        ? 'ALL EPISODES'
        : `EP ${drama.addedEpisodes} ADD`;

  return (
    <Link href={`/drama/${drama.slug}`} className="card">
      <div className="card-poster">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portraitUrl(drama)} alt={drama.title} loading="lazy" />
        <span className="badge-ep">{epBadge}</span>
        <span className="badge-lang">{drama.languages}</span>
        <div className="card-shade" />
        <span className="card-play" aria-hidden="true">▶</span>
        <div className="card-poster-foot">
          <span className="foot-eps">
            {drama.totalEpisodes} {drama.totalEpisodes === 1 ? 'Movie' : 'Eps'}
          </span>
          <span className="foot-views">👁 {formatViews(drama.views)}</span>
        </div>
      </div>
      <div className="card-body">
        <h3>{cardTitle(drama)}</h3>
        <p className="card-meta">
          <span className="card-rating">⭐ {drama.rating?.toFixed(1)}</span>
          {'  ·  '}
          {drama.genres.join(', ')}
        </p>
      </div>
    </Link>
  );
}
