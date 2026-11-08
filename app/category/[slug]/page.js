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
    <section>
      <h1 className="page-title">{cat.name}</h1>
      <p className="page-sub">{list.length} title{list.length === 1 ? '' : 's'} available</p>
      {list.length === 0 ? (
        <p className="empty">No dramas in this category yet.</p>
      ) : (
        <div className="grid">
          {list.map((d) => (
            <DramaCard key={d.slug} drama={d} />
          ))}
        </div>
      )}
    </section>
  );
}
