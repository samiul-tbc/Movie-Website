import SearchGrid from '../components/SearchGrid';
import { dramas, categories } from '../lib/dramas';

export default function HomePage() {
  return (
    <>
      <div className="notice">
        <strong>IMPORTANT NOTICE:</strong> This is a demo catalog with sample
        placeholder dramas. Real titles will be added from the admin side soon.
      </div>
      <SearchGrid dramas={dramas} categories={categories} />
    </>
  );
}
