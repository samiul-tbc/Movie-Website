import { notFound } from 'next/navigation';
import { dramas, getDrama, cardTitle } from '../../../lib/dramas';

export function generateStaticParams() {
  return dramas.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const drama = getDrama(params.slug);
  if (!drama) return { title: 'Drama not found' };
  return {
    title: cardTitle(drama),
    description: drama.storyline.slice(0, 155),
    openGraph: {
      title: cardTitle(drama),
      description: drama.storyline.slice(0, 155),
      images: [drama.poster],
    },
  };
}

function EpisodeSection({ drama, quality }) {
  const is720 = quality === '720';
  return (
    <section className="ep-section">
      <h2 className="section-title">-:- {is720 ? '720p HD' : '1080p Full HD'} :-</h2>
      {drama.episodes.map((ep) => (
        <div className="ep-row" key={`${quality}-${ep.number}`}>
          <span className="ep-name">Episode – {String(ep.number).padStart(2, '0')}</span>
          <a className="btn" href={is720 ? ep.watch720 : ep.watch1080}>▶ Watch</a>
          <a className="btn alt" href={is720 ? ep.download720 : ep.download1080}>⬇ Download</a>
        </div>
      ))}
      <p className="card-meta">
        Links are placeholders in this demo — replace them in <code>lib/dramas.js</code> with
        links for content you have the rights to share.
      </p>
    </section>
  );
}

export default function DramaPage({ params }) {
  const drama = getDrama(params.slug);
  if (!drama) notFound();

  const info = [
    ['Name', drama.title],
    ['Season', drama.season],
    ['Episodes', `${drama.totalEpisodes} (${drama.addedEpisodes} ADD)`],
    ['Running time', drama.runningTime],
    ['Language', drama.languages],
    ['Subtitle', drama.subtitle],
    ['Genres', drama.genres.join(', ')],
    ['Release Date', drama.releaseDate],
    ['Country of origin', drama.country],
    ['Quality', drama.quality],
    ['Maximum File Size', drama.maxFileSize],
  ];

  return (
    <article>
      <div className="detail-poster">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={drama.poster} alt={drama.title} />
      </div>

      <h1 className="detail-title">{cardTitle(drama)}</h1>

      <div className="info-box">
        <h2>-: Information :-</h2>
        {info.map(([label, value]) => (
          <div className="info-row" key={label}>
            <b>{label}:</b>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <h2 className="section-title">***: SCREEN-SHOTS :***</h2>
      <div className="shots">
        {drama.screenshots.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={`${drama.title} screenshot ${i + 1}`} loading="lazy" />
        ))}
      </div>

      <EpisodeSection drama={drama} quality="720" />
      <EpisodeSection drama={drama} quality="1080" />

      <h2 className="section-title">Storyline :-</h2>
      <p className="storyline">{drama.storyline}</p>
    </article>
  );
}
