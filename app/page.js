import Link from 'next/link';
import HeroSlider from '../components/HeroSlider';
import RowScroller from '../components/RowScroller';
import DramaCard from '../components/DramaCard';
import { dramas, categories, getDramasByCategory } from '../lib/dramas';

export default function HomePage() {
  const featured = dramas.filter((d) => d.featured);
  const heroItems = featured.length ? featured : dramas.slice(0, 4);

  const trending = [...dramas]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const latest = [...dramas].sort(
    (a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
  );

  const genres = [...new Set(dramas.flatMap((d) => d.genres))];

  return (
    <>
      <HeroSlider items={heroItems} />

      <div className="notice-bar">
        <div className="notice-inner">
          <strong>IMPORTANT NOTICE</strong>
          <span>
            This is a demo catalog with sample placeholder dramas. Real titles
            will be added from the admin side soon.
          </span>
        </div>
      </div>

      <div className="shell">
        <RowScroller title="🔥 Trending Now" href="/search">
          {trending.map((d, i) => (
            <div className="trend-item" key={d.slug}>
              <span className="trend-rank" aria-hidden="true">
                {i + 1}
              </span>
              <DramaCard drama={d} />
            </div>
          ))}
        </RowScroller>

        <RowScroller title="🆕 Latest Added" href="/search">
          {latest.map((d) => (
            <DramaCard key={d.slug} drama={d} />
          ))}
        </RowScroller>

        <div id="categories">
          {categories.map((c) => {
            const list = getDramasByCategory(c.slug);
            if (!list.length) return null;
            return (
              <RowScroller
                key={c.slug}
                title={c.name}
                href={`/category/${c.slug}`}
              >
                {list.map((d) => (
                  <DramaCard key={d.slug} drama={d} />
                ))}
              </RowScroller>
            );
          })}
        </div>

        <section className="row-section">
          <div className="row-head">
            <h2 className="row-title">🎭 Browse by Genre</h2>
          </div>
          <div className="genre-wrap">
            {genres.map((g) => (
              <Link
                key={g}
                href={`/search?q=${encodeURIComponent(g)}`}
                className="genre-chip"
              >
                {g}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
