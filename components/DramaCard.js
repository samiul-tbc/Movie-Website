import Link from 'next/link';
import { cardTitle } from '../lib/dramas';

export default function DramaCard({ drama }) {
  return (
    <Link href={`/drama/${drama.slug}`} className="card">
      <div className="card-poster">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={drama.poster} alt={drama.title} loading="lazy" />
        <span className="badge-ep">EP {drama.addedEpisodes} ADD</span>
        <span className="badge-lang">{drama.languages}</span>
      </div>
      <div className="card-body">
        <h3>{cardTitle(drama)}</h3>
        <p className="card-meta">
          {drama.genres.join(', ')} · {drama.quality}
        </p>
      </div>
    </Link>
  );
}
