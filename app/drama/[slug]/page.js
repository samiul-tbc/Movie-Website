import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dramas, getDrama, getDramasByCategory, cardTitle } from '../../../lib/dramas';
import DramaCard, { portraitUrl, formatViews } from '../../../components/DramaCard';
import RowScroller from '../../../components/RowScroller';
import EpisodeSwitcher from '../../../components/EpisodeSwitcher';
import {
  IconPlay,
  IconStar,
  IconClock,
  IconEye,
  IconSend,
  IconClapper,
  IconInfo,
  IconMonitor,
} from '../../../components/icons';

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
              <span className="star"><IconStar size={15} /> {drama.rating?.toFixed(1)}</span>
              <span>{yearOf(drama)}</span>
              <span><IconClock size={15} /> {drama.runningTime}</span>
              <span>
                {drama.addedEpisodes}/{drama.totalEpisodes} Episodes
              </span>
              <span><IconEye size={15} /> {formatViews(drama.views)} views</span>
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
                <IconPlay size={17} /> Watch Now
              </a>
              <a
                href="https://t.me/Rdx_kdrama_hindi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-info"
              >
                <IconSend size={17} /> Join Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <section className="glass-panel">
          <h2 className="section-title"><IconClapper size={21} className="section-title-icon" /> Storyline</h2>
          <p className="storyline">{drama.storyline}</p>
        </section>

        <section className="section-block">
          <h2 className="section-title"><IconInfo size={21} className="section-title-icon" /> Information</h2>
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
          <EpisodeSwitcher episodes={drama.episodes} />
        </div>

        <section className="section-block">
          <h2 className="section-title"><IconMonitor size={21} className="section-title-icon" /> Screenshots</h2>
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
