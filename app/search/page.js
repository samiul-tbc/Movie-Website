import SearchGrid from '../../components/SearchGrid';
import { dramas, categories } from '../../lib/dramas';

export const metadata = {
  title: 'Search Dramas',
  description: 'Search Korean, Chinese dramas and Anime by name, genre or language.',
};

export default function SearchPage({ searchParams }) {
  const q = typeof searchParams?.q === 'string' ? searchParams.q : '';
  return (
    <div className="shell">
      <SearchGrid dramas={dramas} categories={categories} initialQuery={q} />
    </div>
  );
}
