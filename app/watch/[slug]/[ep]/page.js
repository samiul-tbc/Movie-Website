import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dramas, getDrama, getDramasByCategory, cardTitle } from '../../../../lib/dramas';
import WatchPlayer from '../../../../components/WatchPlayer';
import DramaCard from '../../../../components/DramaCard';
import RowScroller from '../../../../components/RowScroller';
import { IconClapper } from '../../../../components/icons';

export function generateStaticParams() {
  return dramas.flatMap((d) =>
    d.episodes.map((e) => ({ slug: d.slug, ep: String(e.number) }))
  );
}

export function generateMetadata({ params }) {
  const drama = getDrama(params.slug);
  if (!drama) return { title: 'Not found' };
  return {
    title: `Watch ${drama.title} Episode ${params.ep} Online`,
    description: `Watch ${cardTitle(drama)} — Episode ${params.ep} in 720p HD / 1080p Full HD on HubCart Movie.`,
  };
}

export default function WatchPage({ params, searchParams }) {
  const drama = getDrama(params.slug);
  const epNum = parseInt(params.ep, 10);
  if (!drama || !Number.isFinite(epNum)) notFound();
  const episode = drama.episodes.find((e) => e.number === epNum);
  if (!episode) notFound();

  const q = searchParams?.q === '1080' ? '1080' : '720';
  const related = getDramasByCategory(drama.category)
    .filter((d) => d.slug !== drama.slug)
    .slice(0, 8);

  return (
    <article>
      <WatchPlayer drama={drama} ep={epNum} initialQuality={q} />

      <div className="shell watch-below">
        <section className="glass-panel">
          <h2 className="section-title">
            <IconClapper size={21} className="section-title-icon" /> About this drama
          </h2>
          <p className="storyline">{drama.storyline}</p>
          <p className="watch-about-links">
            <Link href={`/drama/${drama.slug}`} className="row-link">
              Full details, screenshots &amp; all episodes
            </Link>
          </p>
        </section>

        {related.length > 0 && (
          <RowScroller title="You May Also Like" href={`/category/${drama.category}`}>
            {related.map((d) => (
              <DramaCard key={d.slug} drama={d} />
            ))}
          </RowScroller>
        )}
      </div>
    </article>
  );
}
