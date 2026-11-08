import { notFound } from 'next/navigation';
import DramaCard from '../../../components/DramaCard';
import { categories, getCategory, getDramasByCategory } from '../../../lib/dramas';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const cat = getCategory(params.slug);
  if (!cat) return { title: 'Category not found' };
  return {
    title: `${cat.name} Hindi Dubbed`,
    description: `Browse ${cat.name} titles in Hindi Dubbed with episode-wise 720p and 1080p links.`,
  };
}

export default function CategoryPage({ params }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();

  const list = getDramasByCategory(params.slug);

  return (
    <div className="shell">
      <div className="page-head">
        <h1 className="page-title">
          <span className="grad">{cat.name}</span>
          <span className="count-chip">
            {list.length} title{list.length === 1 ? '' : 's'}
          </span>
        </h1>
        <p className="page-sub">
          {cat.name} in Hindi Dubbed &amp; more — episode-wise 720p HD and 1080p
          Full HD updates.
        </p>
      </div>
      {list.length === 0 ? (
        <p className="empty">No dramas in this category yet.</p>
      ) : (
        <div className="grid">
          {list.map((d) => (
            <DramaCard key={d.slug} drama={d} />
          ))}
        </div>
      )}
    </div>
  );
}
