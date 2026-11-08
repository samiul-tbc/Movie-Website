import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dramas, getDrama, getDramasByCategory, cardTitle } from '../../../lib/dramas';
import DramaCard, { portraitUrl, formatViews } from '../../../components/DramaCard';
import RowScroller from '../../../components/RowScroller';

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

function backdropUrl(drama) {
  return drama.poster.replace('/640/360', '/1280/720');
}

function yearOf(drama) {
  const parts = String(drama.releaseDate).trim().split(' ');
  return parts[parts.length - 1];
}

function EpisodeSection({ drama, quality }) {
  const is720 = quality === '720';
  return (
    <section className="section-block">
      <div className="ep-quality-head">
        <span className={is720 ? 'ep-quality-badge' : 'ep-quality-badge fullhd'}>
          {is720 ? '720p HD' : '1080p Full HD'}
        </span>
        <span className="detail-sub">
          {drama.episodes.length} episode{drama.episodes.length === 1 ? '' : 's'} available
        </span>
      </div>
      <div className="ep-grid">
        {drama.episodes.map((ep) => (
          <div className="ep-card" key={`${quality}-${ep.number}`}>
            <span className="ep-pill">EP {ep.number}</span>
            <div className="ep-links">
              <a className="btn" href={is720 ? ep.watch720 : ep.watch1080}>
                ▶ Watch
              </a>
              <a className="btn alt" href={is720 ? ep.download720 : ep.download1080}>
                ⬇ Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="ep-note">
        Links are placeholders in this demo — replace them in <code>lib/dramas.js</code>{' '}
        with links for content you have the rights to share.
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
    ['Episodes', `${drama.totalEpisodes} (${drama.addedEpisodes} ADD)`, true],
    ['Running time', drama.runningTime],
    ['Language', drama.languages],
    ['Subtitle', drama.subtitle],
    ['Genres', drama.genres.join(', ')],
    ['Release Date', drama.releaseDate],
    ['Country of origin', drama.country],
    ['Quality', drama.quality, true],
    ['Maximum File Size', drama.maxFileSize],
    ['Views', formatViews(drama.views)],
  ];

  const related = getDramasByCategory(drama.category).filter(
    (d) => d.slug !== drama.slug
  );

  return (
    <article>
      <div className="detail-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="detail-hero-bg" src={backdropUrl(drama)} alt="" />
        <div className="detail-hero-shade" />
        <div className="detail-hero-inner">
          <div className="detail-poster-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portraitUrl(drama)} alt={drama.title} />
          </div>
          <div>
            <div className="hero-badges">
              <span className="hbadge lime">{drama.type}</span>
              <span className="hbadge">{drama.quality}</span>
              <span className="hbadge blue">{drama.languages}</span>
            </div>
            <h1 className="detail-title">{drama.title}</h1>
            <p className="detail-sub">{cardTitle(drama)}</p>
            <div className="detail-meta">
              <span className="star">⭐ {drama.rating?.toFixed(1)}</span>
              <span>{yearOf(drama)}</span>
              <span>🕐 {drama.runningTime}</span>
              <span>
                {drama.addedEpisodes}/{drama.totalEpisodes} Episodes
              </span>
              <span>👁 {formatViews(drama.views)} views</span>
              <span>{drama.country}</span>
            </div>
            <div className="genre-chips">
              {drama.genres.map((g) => (
                <Link key={g} href={`/search?q=${encodeURIComponent(g)}`}>
                  {g}
                </Link>
              ))}
            </div>
            <div className="detail-actions">
              <a href="#episodes" className="btn-watch">
                ▶ Watch Now
              </a>
              <a
                href="https://t.me/Rdx_kdrama_hindi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-info"
              >
                ✈ Join Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <section className="glass-panel">
          <h2 className="section-title">📖 Storyline</h2>
          <p className="storyline">{drama.storyline}</p>
        </section>

        <section className="section-block">
          <h2 className="section-title">ℹ️ Information</h2>
          <dl className="spec-grid">
            {info.map(([label, value, hl]) => (
              <div className="spec-item" key={label}>
                <dt>{label}</dt>
                <dd className={hl ? 'hl' : undefined}>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div id="episodes">
          <EpisodeSection drama={drama} quality="720" />
          <EpisodeSection drama={drama} quality="1080" />
        </div>

        <section className="section-block">
          <h2 className="section-title">🖼️ Screenshots</h2>
          <div className="shots">
            {drama.screenshots.map((src, i) => (
              <figure key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${drama.title} screenshot ${i + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <RowScroller
            title="You May Also Like"
            href={`/category/${drama.category}`}
          >
            {related.map((d) => (
              <DramaCard key={d.slug} drama={d} />
            ))}
          </RowScroller>
        )}
      </div>
    </article>
  );
}
